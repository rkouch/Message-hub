package messagehub.controllers.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import messagehub.entities.token.Token;
import messagehub.entities.token.TokenRepository;
import messagehub.entities.token.TokenType;
import messagehub.exceptions.BadRequestException;
import messagehub.exceptions.ForbiddenException;
import lombok.RequiredArgsConstructor;
import messagehub.exceptions.UnauthorizedRequestException;
import messagehub.security.config.JwtService;
import messagehub.entities.user.User;
import messagehub.entities.user.UserRole;
import messagehub.entities.user.UsersRepository;
import messagehub.util.AppConstants;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsersRepository usersRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegistrationDetailsRequest request) {
        if (!AppConstants.EMAIL_REGEX.matcher(request.email.trim().toLowerCase()).matches()) {
            throw new ForbiddenException("Invalid email!");
        }

        if (!AppConstants.PASS_REGEX.matcher(request.password.trim()).matches()) {
            throw new ForbiddenException("Invalid password!");
        }
        User user = User.builder()
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .userRole(UserRole.USER)
                .tokens(new ArrayList<>())
                .build();
        try {
            usersRepository.save(user);
        } catch (Exception e) {
            throw new BadRequestException("Email already in use");
        }
        String jwtToken = jwtService.generateToken(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        User user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ForbiddenException(String.format("Unknown account \"%s\"", request.email)));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedRequestException("User password is incorrect!");
        }
        String jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new ForbiddenException("Cannot authenticate user", e);
        }
        User user = usersRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .token(jwtToken)
                .build();
        tokenRepository.save(token);
        user.addToken(token);
        usersRepository.save(user);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> userTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (userTokens.isEmpty()) {
            return;
        }
        userTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(userTokens);
    }


    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String refreshToken;
        final String email;

        Cookie refreshCookie = findCookieByName(request.getCookies(), AppConstants.REFRESH_COOKIE_NAME).orElse(null);
        if (refreshCookie == null) {
            return;
        }
        refreshToken = refreshCookie.getValue();
        email = jwtService.extractUsername(refreshToken);
        if (email != null) {
            User userDetails = this.usersRepository.findByEmail(email).orElseThrow(() -> new ForbiddenException("Email cannot be found"));
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                String accessToken = jwtService.generateToken(userDetails);
                revokeAllUserTokens(userDetails);
                saveUserToken(userDetails, accessToken);
                AuthenticationResponse authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public HttpHeaders generateCookieHeaders(LoginRequest request) {
        User user = usersRepository.findByEmail(request.getEmail()).orElseThrow();
        return getCookieHeaders(user);
    }

    public HttpHeaders generateCookieHeaders(RegistrationDetailsRequest request) {
        User user = usersRepository.findByEmail(request.getEmail()).orElseThrow();
        return getCookieHeaders(user);
    }

    public HttpHeaders generateCookieHeaders(AuthenticationRequest request) {
        User user = usersRepository.findByEmail(request.getEmail()).orElseThrow();
        return getCookieHeaders(user);
    }

    private HttpHeaders getCookieHeaders(User user) {
        String refreshToken = jwtService.generateRefreshToken(user);
        String cookie = AppConstants.REFRESH_COOKIE_NAME + "=" + refreshToken
                + "; HttpOnly; Secure; Path=/api/v1/auth/refresh-token; Max-Age=" + (60 * 60 * 24 * 7);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie);
        headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
        return headers;
    }

    private Optional<Cookie> findCookieByName(Cookie[] cookiesArr, String name) {
        return Optional.ofNullable(cookiesArr)
                        .flatMap(cookies -> Arrays.stream(cookies)
                                .filter(cookie -> cookie.getName().equals(name))
                                .findFirst());
    }
}

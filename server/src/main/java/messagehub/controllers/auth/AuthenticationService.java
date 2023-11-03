package messagehub.controllers.auth;

import messagehub.exceptions.BadRequestException;
import messagehub.exceptions.ForbiddenException;
import lombok.RequiredArgsConstructor;
import messagehub.security.config.JwtService;
import messagehub.entities.user.User;
import messagehub.entities.user.UserRole;
import messagehub.entities.user.UsersRepository;
import messagehub.util.AppConstants;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsersRepository usersRepository;
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
                .build();
        try {
            usersRepository.save(user);
        } catch (Exception e) {
            throw new BadRequestException("Email already in use");
        }


        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
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
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}

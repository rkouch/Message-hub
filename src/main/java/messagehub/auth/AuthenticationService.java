package messagehub.auth;

import messagehub.exceptions.ForbiddenException;
import messagehub.exceptions.ServerException;
import lombok.RequiredArgsConstructor;
import messagehub.exceptions.UnauthorizedRequestException;
import messagehub.registration.RegistrationDetailsRequest;
import messagehub.security.config.JwtService;
import messagehub.user.User;
import messagehub.user.UserRole;
import messagehub.user.UsersRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegistrationDetailsRequest request) {
        User user = User.builder()
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .userRole(UserRole.USER)
                .build();
        usersRepository.save(user);

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

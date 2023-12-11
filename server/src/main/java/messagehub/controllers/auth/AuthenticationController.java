package messagehub.controllers.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import messagehub.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegistrationDetailsRequest request) {
        AuthenticationResponse response = authenticationService.register(request);
        return ResponseEntity.ok()
                .headers(authenticationService.generateCookieHeaders(request))
                .body(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok()
                .headers(authenticationService.generateCookieHeaders(request))
                .body(authenticationService.authenticate(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok()
                .headers(authenticationService.generateCookieHeaders(request))
                .body(authenticationService.login(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @GetMapping("/error")
    public ResponseEntity<String> register(@RequestParam("id") int i) {
        if (i == 100) {
            throw new BadRequestException("Error :(");
        }
        return ResponseEntity.ok("Error");
    }
}

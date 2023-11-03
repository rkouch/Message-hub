package messagehub.controllers.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService loginService;
    // https://stackoverflow.com/questions/77076987/how-can-i-invalidate-the-jwt-token-after-logout-in-spring-boot-with-spring-secur#:~:text=So%20you%20are%20ending%20up,and%20then%20signed%2C%20its%20signed.
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginService.login());
    }

    @DeleteMapping("/logout")
    public ResponseEntity<LoginResponse> logout(@RequestBody LogoutRequest request) {
        return ResponseEntity.ok(loginService.logout());
    }
}

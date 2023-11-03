package messagehub.controllers.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDetailsRequest {
    public String name;
    public String email;
    public String password;
}

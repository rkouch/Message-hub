package messagehub.registration;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDetailsRequest {
    private String name;
    private String email;
    private String password;
}

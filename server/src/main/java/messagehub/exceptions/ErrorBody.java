package messagehub.exceptions;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ErrorBody {
    private int statusCode;
    private String errorReason;
}

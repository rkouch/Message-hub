package messagehub.exceptions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import java.io.Serial;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ErrorBody {
    private int statusCode;
    private String errorReason;
}

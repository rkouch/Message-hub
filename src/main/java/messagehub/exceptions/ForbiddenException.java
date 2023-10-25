package messagehub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.FORBIDDEN, reason="Forbidden")
public class ForbiddenException extends ServerException {
    public ForbiddenException(String reason) {
        super(403, "Forbidden", reason);
    }

    public ForbiddenException(String reason, Throwable cause) {
        super(403, "Bad Request", reason, cause);
    }
}

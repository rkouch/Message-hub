package messagehub.exceptions;

public class UnauthorizedRequestException extends ServerException {
    public UnauthorizedRequestException(String reason) {
        super(401, "Unauthorized", reason);
    }

    public UnauthorizedRequestException(String reason, Throwable cause) {
        super(401, "Unauthorized", reason, cause);
    }
}

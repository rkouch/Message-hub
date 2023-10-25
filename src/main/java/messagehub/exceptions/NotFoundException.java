package messagehub.exceptions;

public class NotFoundException extends ServerException{

    public NotFoundException(String reason) {
        super(404, "Bad Request", reason);
    }

    public NotFoundException(String reason, Throwable cause) {
        super(404, "Bad Request", reason, cause);
    }
}

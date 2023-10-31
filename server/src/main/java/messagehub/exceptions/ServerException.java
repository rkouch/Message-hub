package messagehub.exceptions;

import lombok.Getter;

@Getter
public abstract class ServerException extends RuntimeException {
    private final int statusCode;
    private final String statusText;

    public ServerException(int statusCode, String statusText, String message, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
    public ServerException(int statusCode, String statusText, String message) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }

}

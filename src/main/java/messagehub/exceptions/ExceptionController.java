package messagehub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(ServerException.class)
    public ResponseEntity<ErrorBody> handleCustomException(ServerException ex) {
        return new ResponseEntity<>(new ErrorBody(ex.getStatusCode(), ex.getMessage()), HttpStatus.valueOf(ex.getStatusCode()));
    }
}

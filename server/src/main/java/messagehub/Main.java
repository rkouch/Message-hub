package messagehub;

import lombok.RequiredArgsConstructor;
import messagehub.user.User;
import messagehub.user.UsersRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@PropertySource("classpath:/application.yml")
public class Main {
    private final UsersRepository usersRepository;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(Main.class, args);
    }

    @GetMapping
    public List<User> getCustomers() {
        return usersRepository.findAll();
    }

    record UserRequestBody (
            String name,
            String email,
            Integer age
    ) {}

    @PostMapping
    public void postCustomer(@RequestBody UserRequestBody userRequestBody) {
        User u = new User();
        u.setAge(userRequestBody.age);
        u.setEmail(userRequestBody.email);
        u.setName(userRequestBody.name);
        usersRepository.save(u);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") String id) {
        usersRepository.deleteById(UUID.fromString(id));
    }
}

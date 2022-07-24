package com.backend.hotel.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {

    @NotEmpty(message = "Title cannot be empty")
    @Size(min = 2, message = "The name must have at least two characters.")
    private String name;
    @NotEmpty(message = "Lastname cannot be empty")
    @Size(min = 2, message = "The lastname must have at least two characters.")
    private String lastName;
    @Email(message = "must be a properly formatted email address")
    private String email;
    private String password;
    private String verificationCode;
    private boolean enabled;
}

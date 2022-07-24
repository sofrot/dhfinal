package com.backend.hotel.exception;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@Setter
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    private String nameResource;
    private String field;
    private Integer value;
    private String email;

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String nameResource, String field, Integer value) {
        super(String.format("%s resource not found : %s : '%s'", nameResource, field, value));
        this.nameResource = nameResource;
        this.field = field;
        this.value = value;
    }

    public ResourceNotFoundException(String nameResource, String field, String email) {
        super(String.format("%s resource not found : %s : '%s'", nameResource, field, email));
        this.nameResource = nameResource;
        this.field = field;
        this.email = email;
    }
}

package com.backend.hotel.security;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.exception.BookingAppException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//generamos token, validar token, obtener claims del token
@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}") //obtenemos valor de una propiedad (app.jwt-secret)
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private int jwtExpirationInMs;

    //---------------------metodo obtiene email autentica y retorna token y mando user por claim ---------------------
    public String generateToken(Authentication authentication, UserDTO user){
        String email = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        //generar token con algoritmo y llave secreta
        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .claim("user", user)
                .setExpiration(expiryDate)
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        return token;
    }

    //--------------Agregamos adicional-------------

    private String SECRET_KEY = "laPiponeta";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ((1000 * 60) * 60) * 1 ))//((1min)) * n tiempo de validez del token
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
    //-----------------------------------------------

    //-----------------metodo para obtener usuario del token------------------------
    public String getUserFromJWT(String token){
        //obtener claims(usuario,roles,fechas) del token
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    //--------------metodo para validar el token ------------------
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            throw  new BookingAppException(HttpStatus.BAD_REQUEST, "Invalid JWT signature");
        }
        catch (MalformedJwtException ex){
            throw  new BookingAppException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
        }
        catch (ExpiredJwtException ex){
            throw new BookingAppException(HttpStatus.BAD_REQUEST, "Expired JWT token");
        }
        catch (UnsupportedJwtException ex){
            throw  new BookingAppException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
        }
        catch (IllegalArgumentException ex){
            throw  new BookingAppException(HttpStatus.BAD_REQUEST, "JWT claims string is empty.");
        }
    }
}

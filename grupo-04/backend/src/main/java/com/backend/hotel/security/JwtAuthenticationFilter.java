package com.backend.hotel.security;
import com.backend.hotel.persistence.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//valida completamente el toke- user - password - permite acceder a los recursos
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    //--------------clase que con un filtro valida todo el TOKEN --------------------
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //obtener token de la solicitud http
        String token = getJwtFromRequest(request);
        //si tengo token y es valido
        if(StringUtils.hasText(token) && tokenProvider.validateToken(token)){
            //obtengo el username del token
            String username = tokenProvider.getUserFromJWT(token);
            //cargo el usuario asociado al token
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username); //carga usuario loadByUsername}
            //carga el usuario para autenticarlo
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            //setear el usuario asociado al token
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            //autenticar el usuario
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        //continua con el filtro
        filterChain.doFilter(request, response);
    }

    //----------------obtener token de la solicitud- Bearer TOKEN de acceso------------
    private String getJwtFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization"); //cabecera de la solicitud
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7); //eliminar Bearer de la cadena
        }
        return null;
    }
}

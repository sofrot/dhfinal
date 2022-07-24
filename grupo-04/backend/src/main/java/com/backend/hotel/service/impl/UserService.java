package com.backend.hotel.service.impl;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.RegisterDTO;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.Role;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.persistence.repository.IProductRepository;
import com.backend.hotel.persistence.repository.IRoleRepository;
import com.backend.hotel.persistence.repository.IUserRepository;
import com.backend.hotel.service.IUserService;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IRoleRepository iRoleRepository;

    @Autowired
    private ProductService productService;

    @Override
    public UserDTO findByEmail(String email) {
        User user= iUserRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", email));
        return user.toDTO();
    }

    @Override
    public Set<ProductDTO> getFavorites(String email) {
        User user= iUserRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", email));
        return user.getFavoriteProducts().stream().map(Product::toDTO).collect(Collectors.toSet());
    }

    public String deleteFavorite(String email, Integer productId){
        User user= iUserRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", email));
        Set<Product> favoriteProducts= user.getFavoriteProducts();
        Product product= productService.findById(productId).toEntity();
        product.setId(productId);
        String response = "product not found";
        for (Product p: favoriteProducts){
            if (p.getId()==productId){
                favoriteProducts.remove(p);
                iUserRepository.save(user);
                response = "product removed";
                return response;
            }
        }
        return  response;
    }

    public String addFavorite(String email, Integer productId){
        User user= iUserRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", email));
        Set<Product> favoriteProducts= user.getFavoriteProducts();
        Product product= productService.findById(productId).toEntity();
        product.setId(productId);
        String response = "product not found";
        for (Product p: favoriteProducts){
            if (p.getId()==productId){
                response = "product already added";
                return response;
            }
        }
        favoriteProducts.add(product);
        iUserRepository.save(user);
        response = "product added";
        return response;
    }

    @Override
    public RegisterDTO save(RegisterDTO registerDTO){
        User userEntity = new User();
        userEntity.setName(registerDTO.getName());
        userEntity.setLastName(registerDTO.getLastName());
        userEntity.setEmail(registerDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        userEntity.setRoles(Collections.singleton(iRoleRepository.findByName("ROLE_USER").orElse(null)));
        userEntity.setEnabled(false);
        String verificationCode = RandomString.make(64);
        userEntity.setVerificationCode(verificationCode);
        iUserRepository.save(userEntity);
        return registerDTO;
    }


    public void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "Your email address";
        String senderName = "Digital booking";
        String subject = "Por favor verifique su correo electrónico";
        /*String content = "Querido/a [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Muchas gracias,<br>"
                + "Your company name.";*/

        String content = "<table"+
                "  class=\"m_-7990289322849475032deviceWidth\""+
                "  style=\"max-width: 600px\""+
                "  width=\"100%\""+
                "  cellspacing=\"0\""+
                "  cellpadding=\"0\""+
                "  border=\"0\""+
                "  align=\"center\""+
                ">"+
                "  <tbody>"+
                "    <tr>"+
                "      <td bgcolor=\"#ffffff\" align=\"center\">"+
                "        <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"+
                "          <tbody>"+
                "            <tr>"+
                "              <td valign=\"top\">"+
                "                <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"+
                "                  <tbody>"+
                "                    <tr>"+
                "                      <td style=\"width: 13%; min-width: 40px\" width=\"13%\">"+
                "                         "+
                "                      </td>"+
                "                      <td align=\"center\">"+
                "                        <table"+
                "                          width=\"100%\""+
                "                          cellspacing=\"0\""+
                "                          cellpadding=\"0\""+
                "                          border=\"0\""+
                "                          align=\"left\""+
                "                        >"+
                "                          <td align=\"center\">"+
                "                            <a"+
                "                              href=\"http://grupo4-digitalbooking-front.s3-website.us-east-2.amazonaws.com/\""+
                "                              target=\"_blank\""+
                "                              data-saferedirecturl=\"http://grupo4-digitalbooking-front.s3-website.us-east-2.amazonaws.com/\""+
                "                            >"+
                "                              <img"+
                "                                height=\"auto\""+
                "                                src=\"https://i.ibb.co/xDMnN8V/Logo.png\""+
                "                                style=\""+
                "                                  display: block;"+
                "                                  border: 0px;"+
                "                                  text-decoration: none;"+
                "                                  border-style: none;"+
                "                                  color: #ffffff;"+
                "                                  border-width: 0;"+
                "                                \""+
                "                                width=\"130\""+
                "                                class=\"CToWUd\""+
                "                              />"+
                "                            </a>"+
                "                          </td>"+
                "                          <tbody>"+
                "                            <tr>"+
                "                              <td style=\"padding-top: 16px\" align=\"center\">"+
                "                                <img"+
                "                                  src=\"https://i.ibb.co/TvbJXxg/Email.png\""+
                "                                  style=\""+
                "                                    display: block;"+
                "                                    border: 0px;"+
                "                                    width: 60%;"+
                "                                    max-width: 180px;"+
                "                                    min-width: 180px;"+
                "                                  \""+
                "                                  class=\"CToWUd a6T\""+
                "                                  tabindex=\"0\""+
                "                                  width=\"180\""+
                "                                  height=\"auto\""+
                "                                />"+
                "                                <div"+
                "                                  class=\"a6S\""+
                "                                  dir=\"ltr\""+
                "                                  style=\""+
                "                                    opacity: 0.01;"+
                "                                    left: 516.5px;"+
                "                                    top: 216.067px;"+
                "                                  \""+
                "                                >"+
                "                                  <div"+
                "                                    id=\":p2\""+
                "                                    class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\""+
                "                                    role=\"button\""+
                "                                    tabindex=\"0\""+
                "                                    aria-label=\"Descargar el archivo adjunto \""+
                "                                    data-tooltip-class=\"a1V\""+
                "                                    data-tooltip=\"Descargar\""+
                "                                  >"+
                "                                    <div class=\"akn\">"+
                "                                      <div class=\"aSK J-J5-Ji aYr\"></div>"+
                "                                    </div>"+
                "                                  </div>"+
                "                                </div>"+
                "                              </td>"+
                "                            </tr>"+
                ""+
                "                            <tr>"+
                "                              <td style=\"padding-top: 16px\" align=\"center\">"+
                "                                <h1"+
                "                                  class=\"m_-7990289322849475032f48\""+
                "                                  style=\""+
                "                                    margin: 0;"+
                "                                    font-family: Arial, Helvetica, sans-serif;"+
                "                                    font-size: 28px;"+
                "                                    line-height: 38px;"+
                "                                    font-weight: bold;"+
                "                                    color: #4b4b4b;"+
                "                                  \""+
                "                                >"+
                "                                  Verifique su dirección email"+
                "                                </h1>"+
                "                              </td>"+
                "                            </tr>"+
                ""+
                "                            <tr>"+
                "                              <td style=\"padding-top: 16px\" align=\"center\">"+
                "                                <p"+
                "                                  style=\""+
                "                                    font-family: Arial, Helvetica, sans-serif;"+
                "                                    font-size: 16px;"+
                "                                    line-height: 26px;"+
                "                                    font-weight: normal;"+
                "                                    color: #777777;"+
                "                                    max-width: 380px;"+
                "                                    text-align: center;"+
                "                                  \""+
                "                                >"+
                "                                  Gracias por ayudarnos a mantener su cuenta"+
                "                                  segura! Haga click en el botón de abajo para"+
                "                                  verificar su correo electrónico."+
                "                                </p>"+
                "                              </td>"+
                "                            </tr>"+
                ""+
                "                            <tr>"+
                "                              <td style=\"padding-top: 16px\" align=\"center\">"+
                "                                <div>"+
                "                                  <table"+
                "                                    style=\""+
                "                                      width: 215px;"+
                "                                      border-spacing: 0;"+
                "                                      border-collapse: collapse;"+
                "                                    \""+
                "                                    width=\"215\""+
                "                                    cellspacing=\"0\""+
                "                                    cellpadding=\"0\""+
                "                                    border=\"0\""+
                "                                  >"+
                "                                    <tbody>"+
                "                                      <tr>"+
                "                                        <td"+
                "                                          style=\""+
                "                                            border-collapse: collapse;"+
                "                                            background-color: #d83f15;"+
                "                                            border-radius: 9px;"+
                "                                            white-space: nowrap;"+
                "                                          \""+
                "                                          height=\"43\""+
                "                                          align=\"center\""+
                "                                        >"+
                "                                          <a"+
                "                                            href=\"[[URL]]\""+
                "                                            style=\""+
                "                                              display: inline-block;"+
                "                                              width: 100%;"+
                "                                              font-family: Arial, Helvetica,"+
                "                                                sans-serif;"+
                "                                              font-size: 16px;"+
                "                                              font-weight: bold;"+
                "                                              line-height: 19px;"+
                "                                              color: #ffffff;"+
                "                                              text-align: center;"+
                "                                              text-decoration: none;"+
                "                                              background-color: #d83f15;"+
                "                                              border-radius: 14px;"+
                "                                              border-top: 12px solid #d83f15;"+
                "                                              border-bottom: 12px solid #d83f15;"+
                "                                              text-transform: uppercase;"+
                "                                            \""+
                "                                            target=\"_blank\""+
                "                                          >"+
                "                                              CONFIRMAR EMAIL"+
                "                                              "+
                "                                          </a>"+
                "                                        </td>"+
                "                                      </tr>"+
                "                                    </tbody>"+
                "                                  </table>"+
                "                                </div>"+
                "                              </td>"+
                "                            </tr>"+
                "                          </tbody>"+
                "                        </table>"+
                "                      </td>"+
                "                      <td style=\"width: 13%; min-width: 40px\" width=\"13%\">"+
                "                         "+
                "                      </td>"+
                "                    </tr>"+
                "                  </tbody>"+
                "                </table>"+
                "              </td>"+
                "            </tr>"+
                "            <tr>"+
                "              <td"+
                "                style=\""+
                "                  height: 50px;"+
                "                  min-height: 50px;"+
                "                  line-height: 50px;"+
                "                  font-size: 1px;"+
                "                  border-bottom: 2px solid #f2f2f2;"+
                "                \""+
                "                height=\"50\""+
                "              >"+
                "                 "+
                "              </td>"+
                "            </tr>"+
                "          </tbody>"+
                "        </table>"+
                "      </td>"+
                "    </tr>"+
                "  </tbody>"+
                "  <tbody>"+
                "    <tr>"+
                "      <td align=\"center\" style=\"padding-top: 16px\">"+
                "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">"+
                "          <tbody>"+
                "            <tr>"+
                "              <td"+
                "                style=\"width: 32px; min-width: 32px; max-width: 32px\""+
                "                width=\"32\""+
                "              >"+
                "                 "+
                "              </td>"+
                "              <td valign=\"top\">"+
                "                <table"+
                "                  align=\"right\""+
                "                  border=\"0\""+
                "                  cellpadding=\"0\""+
                "                  cellspacing=\"0\""+
                "                  class=\"m_5803917750868175022responsive-table\""+
                "                  style=\""+
                "                    min-width: 100%;"+
                "                    width: 20%;"+
                "                    max-width: 100%;"+
                "                    min-width: -webkit-calc(20%);"+
                "                    min-width: calc(20%);"+
                "                    width: -webkit-calc(287296px - 53600%);"+
                "                    width: calc(287296px - 53600%);"+
                "                  \""+
                "                  width=\"105\""+
                "                ></table>"+
                ""+
                "                <table"+
                "                  align=\"left\""+
                "                  border=\"0\""+
                "                  cellpadding=\"0\""+
                "                  cellspacing=\"0\""+
                "                  class=\"m_5803917750868175022responsive-table\""+
                "                  style=\""+
                "                    min-width: 100%;"+
                "                    width: 54%;"+
                "                    max-width: 100%;"+
                "                    min-width: -webkit-calc(54%);"+
                "                    min-width: calc(54%);"+
                "                    width: -webkit-calc(287296px - 53600%);"+
                "                    width: calc(287296px - 53600%);"+
                "                  \""+
                "                  width=\"290\""+
                "                >"+
                "                  <tbody>"+
                "                    <tr>"+
                "                      <td align=\"center\">"+
                "                        <table"+
                "                          align=\"left\""+
                "                          border=\"0\""+
                "                          cellpadding=\"0\""+
                "                          cellspacing=\"0\""+
                "                          width=\"100%\""+
                "                        >"+
                "                          <tbody>"+
                "                            <tr>"+
                "                              <td align=\"left\">"+
                "                                <p"+
                "                                  style=\""+
                "                                    margin: 0;"+
                "                                    margin: 0;"+
                "                                    font-family: Arial, Helvetica, sans-serif;"+
                "                                    font-size: 13px;"+
                "                                    line-height: 15px;"+
                "                                    font-weight: 400;"+
                "                                    color: #a7a7a7;"+
                "                                  \""+
                "                                >"+
                "                                  Certified Tech Developer - Digital House"+
                "                                </p>"+
                "                                <p"+
                "                                  style=\""+
                "                                    margin: 0;"+
                "                                    margin: 0;"+
                "                                    margin-top: px;"+
                "                                    font-family: Arial, Helvetica, sans-serif;"+
                "                                    font-size: 13px;"+
                "                                    line-height: 17px;"+
                "                                    font-weight: 400;"+
                "                                    color: #a7a7a7;"+
                "                                  \""+
                "                                ></p>"+
                "                              </td>"+
                "                            </tr>"+
                "                          </tbody>"+
                "                        </table>"+
                "                      </td>"+
                "                    </tr>"+
                "                  </tbody>"+
                "                </table>"+
                "              </td>"+
                "              <td"+
                "                style=\"width: 32px; min-width: 32px; max-width: 32px\""+
                "                width=\"32\""+
                "              >"+
                "                 "+
                "              </td>"+
                "            </tr>"+
                "          </tbody>"+
                "        </table>"+
                "      </td>"+
                "    </tr>"+
                ""+
                "    <tr>"+
                "      <td"+
                "        height=\"60\""+
                "        style=\""+
                "          height: 60px;"+
                "          min-height: 60px;"+
                "          line-height: 60px;"+
                "          font-size: 1px;"+
                "        \""+
                "      >"+
                "         "+
                "      </td>"+
                "    </tr>"+
                "  </tbody>"+
                "</table>";



        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("bookingC1G4@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getEmail());

        String verifyURL = siteURL + "/api/auth/verify/" + user.getVerificationCode(); // ver url -> add api y auth


        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Transactional
    public Boolean verify(String verificationCode){
        User user = iUserRepository.findByVerificationCode(verificationCode).orElse(null);
        if(user == null || user.isEnabled() || !user.getVerificationCode().equals(verificationCode)){
            return false;
        }else{
            user.setEnabled(true);
            iUserRepository.save(user);
            return true;
        }
    }
}

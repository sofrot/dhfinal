package com.backend.hotel.service.impl;
import com.backend.hotel.config.EmailReservation;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.ReservationDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Reservation;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.persistence.repository.IReservationRepository;
import com.backend.hotel.persistence.repository.IUserRepository;
import com.backend.hotel.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private IReservationRepository reservationRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public ReservationDTO findById(Integer id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Reservation", "id", id));
        return reservation.toDTO();
    }

    @Override
    public ReservationDTO save(ReservationDTO reservationDTO) {
        User user = userRepository.findById(reservationDTO.getUser().getId()).orElse(null);
        reservationDTO.setUser(user);
        Reservation reservation = reservationDTO.toEntity();
        reservationRepository.save(reservation);
        return reservation.toDTO();
    }


    @Override
    public ReservationDTO update(ReservationDTO reservationDTO) {
        Reservation reservation = reservationRepository.findById(reservationDTO.getId())
                .orElseThrow(()-> new ResourceNotFoundException("Reservation", "id", reservationDTO.getId()));
        reservationRepository.save(reservationDTO.toEntity());
        return reservation.toDTO();
    }

    @Override
    public void deleteById(Integer id) throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Reservation", "id", id));
        reservationRepository.delete(reservation);
    }

    @Override
    public List<ReservationDTO> findAll() {
        List<Reservation> reservationList = reservationRepository.findAll();
        return reservationList.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }

    //-------------------- Get reservation by productId ----------------
    @Override
    public List<ReservationDTO> findAllByProductId(Integer productId) {
        List<Reservation> reservations = reservationRepository.findByProduct_Id(productId);
        return reservations.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }

    //-------------------- Get reservation by userId ---------------------
    @Override
    public List<ReservationDTO> findAllByUserId(Integer userId) {
        List<Reservation> reservations = reservationRepository.findByUser_id(userId);
        return reservations.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }

    //------------------------RESERVATION------------------------------------
    public void sendReservationEmail(ReservationDTO reservationDTO, String siteURL, ProductDTO productData) throws MessagingException, UnsupportedEncodingException {
        User user = userRepository.findById(reservationDTO.getUser().getId())
                .orElseThrow(()-> new ResourceNotFoundException("User", "id", reservationDTO.getUser().getId()));
        String subject = "¡Gracias! su reserva en " + productData.getName() + " ha sido realizada con éxito";
        String senderName = "Digital Booking System";
        String verifyURL = siteURL;

        if(reservationDTO.getComments() == null){
            reservationDTO.setComments("Sin comentarios extras");
        }

        String mailContent = EmailReservation.message(reservationDTO, siteURL, productData);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setFrom("help.digitalbookingg4@gmail.com",senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(mimeMessage);
    }


}

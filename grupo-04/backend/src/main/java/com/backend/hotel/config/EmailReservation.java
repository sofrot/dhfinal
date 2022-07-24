package com.backend.hotel.config;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.ReservationDTO;

public class EmailReservation {

    public static String message(ReservationDTO reservationDTO, String siteURL, ProductDTO productDTO){
        return   "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"max-width:640px\" width=\"100%\">\n" +
                "        <tbody>\n" +
                "            <tr>\n" +
                "                <td align=\"left\"\n" +
                "                    style=\"font-size:16px;line-height:24px;font-weight:bold;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#3d4852;padding:0 8px\">\n" +
                "                    Datos de la reserva\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                \n" +
                "                <td height=\"16\">\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <tr align=\"center\">\n" +
                "                <td style=\"padding:0 8px\">\n" +
                "                    <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\"\n" +
                "                        style=\"border-collapse:separate\" width=\"100%\">\n" +
                "                        <tbody>\n" +
                "                            <tr>\n" +
                "                                <td style=\"border:1px solid #e6e6e6;border-radius:4px\">\n" +
                "                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\">\n" +
                "                                        <tbody>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\" style=\"max-width:622px\" width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Entrada\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    <time\n" +
                "                                                                                        datetime=\"2022-10-26T14:00:00-03:00\">" + reservationDTO.getCheckIn() + "</time>\n" +
                "                                                                                    <br><span\n" +
                "                                                                                        style=\"color:#1DBEB4;white-space:nowrap\">\n" +
                "                                                                                        (desde las " + reservationDTO.getArrival() + ")\n" +
                "                                                                                    </span>\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\"\n" +
                "                                                        style=\"max-width:622px;border-top:1px solid #e6e6e6\"\n" +
                "                                                        width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Salida\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    <time\n" +
                "                                                                                        datetime=\"2022-10-30T10:00:00-03:00\">\n" +
                "                                                                                        " + reservationDTO.getCheckOut() + "</time>\n" +
                "                                                                                    <br><span\n" +
                "                                                                                        style=\"color:#1DBEB4;white-space:nowrap\">\n" +
                "                                                                                        (hasta las 12:00)\n" +
                "                                                                                    </span>\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\"\n" +
                "                                                        style=\"max-width:622px;border-top:1px solid #e6e6e6\"\n" +
                "                                                        width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Tu reserva\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    " + productDTO.getName() +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\"\n" +
                "                                                        style=\"max-width:622px;border-top:1px solid #e6e6e6\"\n" +
                "                                                        width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Reservaste para\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    " + reservationDTO.getUser().getName() + ", " + reservationDTO.getUser().getLastName()+
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\"\n" +
                "                                                        style=\"max-width:622px;border-top:1px solid #e6e6e6\"\n" +
                "                                                        width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Ubicación\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    <a href=\"https://maps.google.com/maps?q=" + productDTO.getAddress() + "\" style=\"color:#1DBEB4\"\n" +
                "                                                                                        target=\"_blank\">\n" +
                "                                                                                        <address\n" +
                "                                                                                            style=\"font-style:normal\">\n" +
                "                                                                                            " + productDTO.getAddress()+ "\n" +
                "                                                                                        </address>\n" +
                "                                                                                    </a>\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                            <tr>\n" +
                "                                                <td>\n" +
                "                                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "                                                        role=\"presentation\"\n" +
                "                                                        style=\"max-width:622px;border-top:1px solid #e6e6e6\"\n" +
                "                                                        width=\"100%\">\n" +
                "                                                        <tbody>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:224px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b6b6b;padding:16px\">\n" +
                "                                                                                    Comentarios\n" +
                "                                                                                </td>\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                    <table align=\"left\" border=\"0\" cellpadding=\"0\"\n" +
                "                                                                        cellspacing=\"0\" role=\"presentation\"\n" +
                "                                                                        style=\"max-width:382px\" width=\"100%\">\n" +
                "                                                                        <tbody>\n" +
                "                                                                            <tr>\n" +
                "                                                                                <td align=\"left\"\n" +
                "                                                                                    style=\"font-size:16px;line-height:24px;font-weight:normal;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;padding:16px\">\n" +
                "                                                                                    " + reservationDTO.getComments() + "\n" +
                "                                                                            </tr>\n" +
                "                                                                        </tbody>\n" +
                "                                                                    </table>\n" +
                "                                                                </td>\n" +
                "                                                            </tr>\n" +
                "                                                        </tbody>\n" +
                "                                                    </table>\n" +
                "                                                </td>\n" +
                "                                        </tbody>\n" +
                "                                    </table>\n" +
                "                                </td>\n" +
                "                            </tr>\n" +
                "                        </tbody>\n" +
                "                    </table>\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td height=\"32\">\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "        </tbody>\n" +
                "           </table>\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "        </tbody>\n" +
                "    </table>";
    }
}

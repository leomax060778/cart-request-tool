package sap.java.email;

import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * utility class for sending e-mail messages
 * 
 * @author Leonardo Hildt
 *
 */
public class EmailUtility {
	public static void sendEmail(String host, String port, final String userName, final String password, String[] to,
			String[] bccTo, String subject, String message) throws AddressException, MessagingException {

		// sets SMTP server properties
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		
		// creates a new session with an authenticator
		/*
		 * Authenticator auth = new Authenticator() { public
		 * PasswordAuthentication getPasswordAuthentication() { return new
		 * PasswordAuthentication(userName, password); } };
		 */

		Authenticator auth = new SMTPAuthenticator(userName, password);
		Session session = Session.getInstance(properties, auth);

		// creates a new e-mail message
		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress(userName));

		// set the addresses To
		InternetAddress[] addressesTo = new InternetAddress[to.length];
		for (int i = 0; i < to.length; i++) {
			addressesTo[i] = new InternetAddress(to[i]);
		}
		msg.setRecipients(Message.RecipientType.TO, addressesTo);

		// set the addresses Bcc
		if (bccTo.length > 0) {
			InternetAddress[] addressesBcc = new InternetAddress[bccTo.length];
			for (int i = 0; i < bccTo.length; i++) {
				addressesBcc[i] = new InternetAddress(bccTo[i]);
			}
			msg.setRecipients(Message.RecipientType.BCC, addressesBcc);
		}

		msg.setSubject(subject);
		msg.setSentDate(new Date());
		msg.setContent(message, "text/html; charset=utf-8");

		// sends the e-mail
		Transport.send(msg);

	}
}

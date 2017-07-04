package sap.java.email;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * 
 * @author Leonardo Hildt
 *
 */
public class SMTPAuthenticator extends Authenticator {
	
	private PasswordAuthentication authentication;

	public SMTPAuthenticator(String login, String password) {
		authentication = new PasswordAuthentication(login, password);
	}

	@Override
	protected PasswordAuthentication getPasswordAuthentication() {
		return authentication;
	}
}

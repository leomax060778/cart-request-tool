package sap.java.email;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * 
 * @author Leonardo Hildt
 *
 */
public class EmailCompose {

	@SerializedName("addressTo")
	@Expose
	private List<EmailAddress> addressTo = new ArrayList<EmailAddress>();

	@SerializedName("addressBcc")
	@Expose
	private List<EmailAddress> addressBcc = new ArrayList<EmailAddress>();

	@SerializedName("subject")
	@Expose
	private String subject = "";

	@SerializedName("message")
	@Expose
	private String message = "";

	public List<EmailAddress> getAddressTo() {
		return addressTo;
	}

	public void setAddressTo(List<EmailAddress> addressTo) {
		this.addressTo = addressTo;
	}

	public List<EmailAddress> getAddressBcc() {
		return addressBcc;
	}

	public void setAddressBcc(List<EmailAddress> addressBcc) {
		this.addressBcc = addressBcc;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getAddressesTo() {
		String addresses = "";

		for (EmailAddress address : addressTo) {
			if (addresses.length() <= 0) {
				addresses = address.getAddress();
			} else {
				addresses = addresses + ", " + address.getAddress();
			}
		}
		return addresses;
	}

	public String[] getAddressesAsArray() {
		String[] addresses = new String[addressTo.size()];

		int i = 0;
		for (EmailAddress address : addressTo) {
			addresses[i] = address.getAddress();
			i = i + 1;
		}
		return addresses;

	}

	public String[] getAddressesBccAsArray() {
		String[] addresses = new String[addressBcc.size()];

		int i = 0;
		for (EmailAddress address : addressBcc) {
			addresses[i] = address.getAddress();
			i = i + 1;
		}

		return addresses;

	}

}

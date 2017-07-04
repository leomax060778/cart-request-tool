package sap.java.email;

/**
 * 
 * @author Leonardo Hildt
 *
 */
public class EmailResponse {

	Integer code = 0;

	String status = "";

	String description = "";

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}

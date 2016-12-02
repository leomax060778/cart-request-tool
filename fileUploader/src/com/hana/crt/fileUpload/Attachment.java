package com.hana.crt.fileUpload;

public class Attachment {

	private String originalName;
	private String savedName;
	private String type;
	private Long attachmentSize;
	private Long userId;

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getSavedName() {
		return savedName;
	}

	public void setSavedName(String savedName) {
		this.savedName = savedName;
	}

	public Long getAttachmentSize() {
		return attachmentSize;
	}

	public void setAttachmentSize(Long attachmentSize) {
		this.attachmentSize = attachmentSize;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getJson() {
		StringBuffer json = new StringBuffer();
		json.append("{");
		if (this.originalName != null) {
			json.append("\"ORIGINAL_NAME\":");
			json.append("\"" + this.originalName + "\",");
		}
		if (this.originalName != null) {
			json.append("\"SAVED_NAME\":");
			json.append("\"" + this.savedName + "\",");
		}
		if (this.attachmentSize != null) {
			json.append("\"ATTACHMENT_SIZE\":");
			json.append(this.attachmentSize + ",");
		}
		if (this.type != null) {
			json.append("\"ATTACHMENT_TYPE\":");
			json.append("\"" + this.type + "\"");
		}
		json.append("}");
		return json.toString();
	}
}

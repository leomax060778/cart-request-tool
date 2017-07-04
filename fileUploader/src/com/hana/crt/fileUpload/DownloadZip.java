package com.hana.crt.fileUpload;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * 
 * @author Leonardo Hildt
 *
 */
public class DownloadZip {

	@SerializedName("originalName")
	@Expose
	private String originalName;

	@SerializedName("savedName")
	@Expose
	private String savedName;

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

	@Override
	public String toString() {
		return "ClassPojo [savedName = " + savedName + ", originalName = " + originalName + "]";
	}
}

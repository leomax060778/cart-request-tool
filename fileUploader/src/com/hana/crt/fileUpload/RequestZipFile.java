package com.hana.crt.fileUpload;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * 
 * @author Leonardo Hildt
 *
 */
public class RequestZipFile {

	@SerializedName("requester")
	@Expose
	String requester;
	
	@SerializedName("files")
	@Expose
	List<DownloadZip> files = new ArrayList<DownloadZip>();

	public String getRequester() {
		return requester;
	}

	public void setRequester(String requester) {
		this.requester = requester;
	}

	public List<DownloadZip> getFiles() {
		return files;
	}

	public void setFiles(List<DownloadZip> files) {
		this.files = files;
	}

}

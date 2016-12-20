package com.hana.crt.fileUpload;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipFileGenerator {
	
	private List<String> nameUsed;
	
	public ZipFileGenerator() {
		this.nameUsed = new ArrayList<String>();
	}
	
	public void createZipFile(String zipName, String uploadDirectory, List<AttachmentHana> attachments){
    	try{
    		FileOutputStream fos = new FileOutputStream(zipName);
    		ZipOutputStream zos = new ZipOutputStream(fos);
    		this.addFiles(zos, uploadDirectory, attachments);
    		zos.close();
    	}catch(IOException ex){
    	   ex.printStackTrace();
    	}
	}
	
	private void addFiles(ZipOutputStream zos,String uploadDirectory,List<AttachmentHana> attachments) throws IOException{
		byte[] buffer = new byte[1024];
		for (AttachmentHana attachment : attachments) {
			ZipEntry ze= new ZipEntry(this.getName(attachment.getORIGINAL_NAME()));
			zos.putNextEntry(ze);
			FileInputStream in = new FileInputStream(uploadDirectory+"\\"+attachment.getSAVED_NAME());
			int len;
			while ((len = in.read(buffer)) > 0) {
				zos.write(buffer, 0, len);
			}
			in.close();
			zos.closeEntry();
		}
	}
	
	private String getName(String actualName){
		String auxName = actualName;
		int nameCount = 1;
		while(this.nameUsed.contains(actualName)){
			actualName = (++nameCount + "-" + auxName);
		}
		this.nameUsed.add(actualName);
		return actualName;
	}
}

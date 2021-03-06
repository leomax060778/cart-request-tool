package com.hana.crt.fileUpload;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

public class FileManager {
	
	private static final String UPLOAD_DIRECTORY_PROPERTY = "upload.path";
	private static final String CONFIG_PROPERTIES = "config.properties";
	private static final String ZIP_FILE_NAME = "files.zip";
	
	final String lexicon = "abcdefghijklmnopqrstuvwxyz12345674890";
	final java.util.Random rand = new java.util.Random(); 
	final Set<String> identifiers = new HashSet<String>();
	
	public String generateZipFile(List<AttachmentHana> fileList) throws IOException{
		Properties properties = this.getProperties();
		String uploadFilesDir = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY);
		String zipPathTmp = uploadFilesDir+"\\tmp";
		String tmpDir = zipPathTmp+"\\"+this.getNewFileName(zipPathTmp)+".zip";
		this.createZipFile(tmpDir, uploadFilesDir, fileList);
		return tmpDir;
	}
	
	private void createZipFile(String tmpDir, String uploadFilesDir ,List<AttachmentHana> attachments){
		ZipFileGenerator zipGenerator = new ZipFileGenerator();
		zipGenerator.createZipFile(tmpDir,uploadFilesDir ,attachments);
	}
	
	private String createTempDir(){
		Properties properties = this.getProperties();
		String tempDir = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY)+"\\tmp";
		String tempFolder = this.getNewFileName(tempDir);
		File file = new File(tempDir+"\\"+tempFolder);
		file.mkdirs();
		return tempDir+"\\"+tempFolder;
	}
	
	public String getNewFileName(String uploadDiretory){
		File file = null;
		String newName = this.randomIdentifier();
		do{
			file = new File(uploadDiretory + newName);
		}while(file != null && file.exists());
		return newName;
	}

	public String randomIdentifier() {
	    StringBuilder builder = new StringBuilder();
	    while(builder.toString().length() == 0) {
	        int length = rand.nextInt(5)+20;
	        for(int i = 0; i < length; i++) {
	            builder.append(lexicon.charAt(rand.nextInt(lexicon.length())));
	        }
	        if(identifiers.contains(builder.toString())) {
	            builder = new StringBuilder();
	        }
	    }
	    return builder.toString();
	}
	
	private Properties getProperties() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = getClass().getClassLoader().getResourceAsStream(CONFIG_PROPERTIES);
			prop.load(input);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return prop;
	}

}

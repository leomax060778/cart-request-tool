package com.hana.crt.fileUpload;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class FileUpload
 */
@WebServlet("/FileUpload")
public class FileUpload extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final String UPLOAD_DIRECTORY_PROPERTY = "upload.path";
	private static final String UPLOAD_URL_PROPERTY = "upload.url";
	private static final String FILE_NAME_ZIP_GPO = "file.name.zip.requester.gpo";
	private static final String FILE_NAME_ZIP_TRAINING = "file.name.zip.requester.training";
	private static final String CONFIG_PROPERTIES = "config.properties";
	private static final String REQUESTER_GPO = "gpo";
	private static final String REQUESTER_TRAINING = "training";

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileUpload() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Properties properties = this.getProperties();
		String attachmentList = request.getParameter("GET_ATTACHMENTS_BY_ID");
		String attachmentId = request.getParameter("ATTACHMENT_ID");
		if(attachmentList != null && !attachmentList.trim().equals("")){
			String requester = request.getParameter("REQUESTER");
			this.responseZipFile(attachmentList, response, properties,requester);
		} else if(attachmentId != null){
			this.responseSingleFile(attachmentId, response, properties);
		}
	}
	
	private void responseZipFile(String attachments,HttpServletResponse response, Properties properties, String requester) throws MalformedURLException, IOException{
		FileManager fileManager = new FileManager();
		FileUploadHanaConnection connection = new FileUploadHanaConnection();
		String uploadUrl = properties.getProperty(UPLOAD_URL_PROPERTY);		
		String responseString = connection.getAttachmentService(uploadUrl, "GET_ATTACHMENTS_BY_ID="+attachments);
		Gson gson = new Gson();
		AttachmentHana[] attachmentsArray = gson.fromJson(responseString, AttachmentHana[].class);
		String zipFilePath = fileManager.generateZipFile(Arrays.asList(attachmentsArray));	
		File file = new File(zipFilePath);
		String mime = file.toURL().openConnection().getContentType();
		response.setHeader("Content-Disposition", "attachment;filename="+this.getFileName(requester, properties));

		if (mime == null) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		response.setContentType(mime);
		response.setContentLength((int) file.length());
		FileInputStream in = new FileInputStream(file);
		OutputStream out = response.getOutputStream();
		byte[] buf = new byte[1024];
		int count = 0;
		while ((count = in.read(buf)) >= 0) {
			out.write(buf, 0, count);
		}
		out.close();
		in.close();	
	}
	
	private void responseSingleFile(String attachmentId,HttpServletResponse response, Properties properties) throws IOException{
		FileUploadHanaConnection connection = new FileUploadHanaConnection();
		String uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY);
		String uploadUrl = properties.getProperty(UPLOAD_URL_PROPERTY);		
		if(attachmentId == null){
			response.getWriter().append("ERROR WITH PARAMETERS");
			return;
		}
		String responseString = connection.getAttachmentService(uploadUrl, "GET_ATTACHMENT_BY_ID="+attachmentId);
		Gson gson = new Gson();
		Type type = new TypeToken<Map<String, String>>(){}.getType();
		Map<String, String> myMap = gson.fromJson(responseString, type);
		
		String filename = uploadDiretory + "\\" + myMap.get("SAVED_NAME");
		File file = new File(filename);
		String mime = file.toURL().openConnection().getContentType();
		response.setHeader("Content-Disposition", "attachment;filename=" + myMap.get("ORIGINAL_NAME"));

		if (mime == null) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		response.setContentType(mime);
		response.setContentLength((int) file.length());
		FileInputStream in = new FileInputStream(file);
		OutputStream out = response.getOutputStream();
		byte[] buf = new byte[1024];
		int count = 0;
		while ((count = in.read(buf)) >= 0) {
			out.write(buf, 0, count);
		}
		out.close();
		in.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Properties propesties = this.getProperties();
		String uploadUrl = propesties.getProperty(UPLOAD_URL_PROPERTY);
		FileUploadHanaConnection connection = new FileUploadHanaConnection();
		List<Attachment> attachmentList = this.createFiles(request, response);
		String responseString = "";
		for (Attachment attachment : attachmentList) {
			responseString = connection.executePost(uploadUrl, attachment.getJson());
		}
		response.getWriter().append(responseString);
	}

	protected List<Attachment> createFiles(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		FileManager fileManager = new FileManager();
		List<Attachment> attachmentList = new ArrayList<Attachment>();
		response.setContentType("text/html");
		Properties propesties = this.getProperties();
		String uploadDiretory = propesties.getProperty(UPLOAD_DIRECTORY_PROPERTY);
		boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);
		if (!isMultipartContent) {
			response.getWriter().append("You are not trying to upload");
			return attachmentList;
		}
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			List<FileItem> fields = upload.parseRequest(new ServletRequestContext(request));
			Iterator<FileItem> it = fields.iterator();
			if (!it.hasNext()) {
				response.getWriter().append("No fields found");
				return attachmentList;
			}
			while (it.hasNext()) {
				Attachment attachment = new Attachment();
				FileItem fileItem = it.next();
				String fileName = fileItem.getName().substring(fileItem.getName().lastIndexOf('\\')+1, fileItem.getName().length());
				fileName = fileName.substring(fileName.lastIndexOf('/')+1, fileName.length());
				String newName = fileManager.getNewFileName(uploadDiretory);
				attachment.setOriginalName(fileName);
				attachment.setSavedName(newName);
				attachment.setAttachmentSize(fileItem.getSize());
				attachment.setType(fileItem.getContentType());
				boolean isFormField = fileItem.isFormField();
				if (!isFormField) {
					File file = new File(uploadDiretory + newName);
					if (!file.exists()) {
						file.createNewFile();
					}
					fileItem.write(file);
					attachmentList.add(attachment);
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return attachmentList;
	}

	private Properties getProperties() {
		Properties prop = new Properties();
		InputStream input = null;

		try {
			input = getClass().getClassLoader().getResourceAsStream(CONFIG_PROPERTIES);
			// load a properties file
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
	
	private String getFileName(String requester, Properties properties){
		String fileName = "files.zip";
		if(requester != null && !requester.trim().equals("")){
			if(requester.equals(REQUESTER_GPO)){
				fileName = properties.getProperty(FILE_NAME_ZIP_GPO);
			} else if(requester.equals(REQUESTER_TRAINING)){
				fileName = properties.getProperty(FILE_NAME_ZIP_TRAINING);
			}
		}
		return fileName;
	}
	
}

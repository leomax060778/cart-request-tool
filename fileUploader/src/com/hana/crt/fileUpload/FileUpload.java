package com.hana.crt.fileUpload;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

/**
 * Servlet implementation class FileUpload
 */
public class FileUpload extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final Logger LOGGER = LoggerFactory.getLogger(FileUpload.class);

	private static final String UPLOAD_DIRECTORY_PROPERTY = "upload.path";
	private static final String UPLOAD_FOLDER_CRT = "upload.crt.folder";
	private static final String UPLOAD_FOLDER_MPT = "upload.mpt.folder";
	private static final String UPLOAD_URL_PROPERTY = "upload.url";
	private static final String FILE_NAME_ZIP_GPO = "file.name.zip.requester.gpo";
	private static final String FILE_NAME_ZIP_TRAINING = "file.name.zip.requester.training";
	private static final String FILE_NAME_ZIP_INTEL_FOUNDING = "file.name.zip.intel.founding";
	private static final String CONFIG_PROPERTIES = "config.properties";
	private static final String REQUESTER_GPO = "gpo";
	private static final String REQUESTER_TRAINING = "training";
	private static final String INTEL_FOUNDING = "intelExtFounding";
	private static final String ORIGINAL_NAME = "ORIGINAL_NAME";
	private static final String SAVED_NAME = "SAVED_NAME";
	private static final String ORIGIN = "ORIGIN";

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
		String originalName = request.getParameter(ORIGINAL_NAME);

		if (originalName != null) {
			String savedName = request.getParameter(SAVED_NAME);
			String origin = request.getParameter(ORIGIN) == null ? "" : request.getParameter(ORIGIN);
			this.responseSingleFile(originalName, savedName, origin, response, properties);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Workaround to download multiple files
		String action = request.getParameter("action");
		String requester = request.getParameter("requester");

		if (action != null && (action.startsWith("downloadzip") && requester != null)) {
			String origin = request.getParameter(ORIGIN) == null ? "" : request.getParameter(ORIGIN);
			StringBuffer jb = new StringBuffer();
			String line = null;
			try {
				BufferedReader reader = request.getReader();
				while ((line = reader.readLine()) != null)
					jb.append(line);
			} catch (Exception e) {
				/* report an error */ }

			ServletOutputStream out = null;
			try {
				Properties properties = this.getProperties();
				List<DownloadZip> zipFiles = new ArrayList<DownloadZip>();
				Gson gson = new Gson();

				DownloadZip[] requestedZip = gson.fromJson(jb.toString(), DownloadZip[].class);
				zipFiles = Arrays.asList(requestedZip);
				DownloadZip zipFile = this.responseZipFile(zipFiles, response, properties, requester, origin);

				byte[] bytes = gson.toJson(zipFile).getBytes();
				response.setContentType("application/json");
				response.setCharacterEncoding("utf8");
				response.setContentLength(bytes.length);
				out = response.getOutputStream();
				out.write(bytes, 0, bytes.length);

			} catch (Exception e) {
				// crash and burn
				throw new IOException("Error parsing JSON request string");
			} finally {
				out.flush();
				out.close();
			}

		} else {
			/*
			 * // Current implementation - Tested and working 20170517
			 * List<Attachment> attachmentList = this.createFiles(request,
			 * response); List<String> responseString = new ArrayList<String>();
			 * 
			 * request.setCharacterEncoding("utf8");
			 * response.setContentType("application/json");
			 * 
			 * for (Attachment attachment : attachmentList) { LOGGER.info(
			 * "Created file " + attachment.getJson());
			 * responseString.add(attachment.getJson()); }
			 * response.getWriter().append(responseString.toString());
			 * 
			 */
			List<Attachment> attachmentList = new ArrayList<Attachment>();
			List<String> attachmentListAsJson = new ArrayList<String>();
			PrintWriter out = null;

			response.setContentType("application/json");
			response.setCharacterEncoding("utf8");

			try {
				attachmentList = this.createFiles(request, response);
				out = response.getWriter();

				for (Attachment attachment : attachmentList) {
					attachmentListAsJson.add(attachment.getJson());
				}

				out.println(attachmentListAsJson);
				out.flush();
				out.close();

			} catch (Exception e) {
				throw new IOException("Error when creating the file");
			} finally {

			}

		}
	}

	/**
	 * 
	 * @param attachments
	 * @param response
	 * @param properties
	 * @param requester
	 * @param origin
	 * @return
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	private DownloadZip responseZipFile(List<DownloadZip> zipFiles, HttpServletResponse response, Properties properties,
			String requester, String origin) throws MalformedURLException, IOException {

		/*
		 * FileUploadHanaConnection connection = new FileUploadHanaConnection();
		 * String uploadUrl = properties.getProperty(UPLOAD_URL_PROPERTY);
		 * String responseString = connection.getAttachmentService(uploadUrl,
		 * "GET_ATTACHMENTS_BY_ID="+attachments); Gson gson = new Gson();
		 * AttachmentHana[] attachmentsArray = gson.fromJson(responseString,
		 * AttachmentHana[].class);
		 */

		/*
		 * Split the list of attachments
		 * 
		 * String[] files = attachments.split("-"); for (String fileRequested :
		 * files) { if (fileRequested != null) { if
		 * (fileRequested.contains("$")) { String[] fileNames =
		 * fileRequested.split("$"); if (fileNames.length == 2) { String
		 * originalName = fileNames[0]; String savedName = fileNames[1];
		 * 
		 * // Create object and add it into the list AttachmentHana
		 * attachmentHana = new AttachmentHana();
		 * attachmentHana.setORIGINAL_NAME(originalName);
		 * attachmentHana.setSAVED_NAME(savedName);
		 * attachmentsHana.add(attachmentHana); } } } }
		 */

		FileManager fileManager = new FileManager();
		List<AttachmentHana> attachmentsHana = new ArrayList<AttachmentHana>();

		for (DownloadZip zipFile : zipFiles) {
			if (zipFile != null) {
				// Create object and add it into the list
				AttachmentHana attachmentHana = new AttachmentHana();
				attachmentHana.setORIGINAL_NAME(zipFile.getOriginalName());
				attachmentHana.setSAVED_NAME(zipFile.getSavedName());
				attachmentsHana.add(attachmentHana);
			}
		}

		String zipFileName = fileManager.generateZipFile(attachmentsHana, origin);

		// Return attachment for zip file
		DownloadZip zipAttachment = new DownloadZip();
		zipAttachment.setOriginalName(this.getFileName(requester, properties));
		zipAttachment.setSavedName(zipFileName);

		return zipAttachment;
	}

	/**
	 * 
	 * @param originalName
	 * @param savedName
	 * @param response
	 * @param properties
	 * @throws IOException
	 */
	private void responseSingleFile(String originalName, String savedName, String origin, HttpServletResponse response,
			Properties properties) throws IOException {

		// Validate parameters
		if (originalName == null) {
			response.getWriter().append("ERROR WITH PARAMETERS");
			return;
		}

		String uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY);
		String filename = "";
		// Special case for .zip files
		if (originalName.endsWith(".zip")) {
			uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY) + "tmp";
			savedName = savedName + ".zip";
			filename = uploadDiretory + "\\" + savedName;
		}else{
			filename = uploadDiretory + "\\" + properties.getProperty(UPLOAD_FOLDER_CRT) + "\\" + savedName;
			// look for file in CRT or MPT folder
			if (origin != null && origin.equalsIgnoreCase("MPT")) {
				filename = uploadDiretory + "\\" + properties.getProperty(UPLOAD_FOLDER_MPT) + "\\" + savedName;
			}
		}

		File file = new File(filename);
		String mime = file.toURL().openConnection().getContentType();
		response.setHeader("Content-Disposition", "attachment;filename=" + originalName);

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
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	protected List<Attachment> createFiles(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		FileManager fileManager = new FileManager();
		List<Attachment> attachmentList = new ArrayList<Attachment>();
		response.setContentType("text/html");
		Properties properties = this.getProperties();
		String uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY);
		String origin = request.getParameter(ORIGIN);

		// look for file in CRT or MPT folder
		uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY) + "\\"
				+ properties.getProperty(UPLOAD_FOLDER_CRT);
		if (origin != null && origin.equalsIgnoreCase("MPT")) {
			uploadDiretory = properties.getProperty(UPLOAD_DIRECTORY_PROPERTY) + "\\"
					+ properties.getProperty(UPLOAD_FOLDER_MPT);
		}

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

				if (fileItem.getName() != null) {
					String fileName = fileItem.getName().substring(fileItem.getName().lastIndexOf('\\') + 1,
							fileItem.getName().length());
					fileName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length());
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

			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return attachmentList;
	}

	/**
	 * 
	 * @return
	 */
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

	/**
	 * 
	 * @param requester
	 * @param properties
	 * @return
	 */
	private String getFileName(String requester, Properties properties) {
		String fileName = "files.zip";
		if (requester != null && !requester.trim().equals("")) {
			// CRT - GPIO Info and Templates
			if (requester.equals(REQUESTER_GPO)) {
				fileName = properties.getProperty(FILE_NAME_ZIP_GPO);
			}
			// CRT - Training & Education
			if (requester.equals(REQUESTER_TRAINING)) {
				fileName = properties.getProperty(FILE_NAME_ZIP_TRAINING);
			}
			// MPT - Intel Foundation
			if (requester.equalsIgnoreCase(INTEL_FOUNDING)) {
				fileName = properties.getProperty(FILE_NAME_ZIP_INTEL_FOUNDING);
			}
		}
		return fileName;
	}

}

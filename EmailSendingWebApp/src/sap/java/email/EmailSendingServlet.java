package sap.java.email;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * A servlet that takes message details from user and send it as a new e-mail
 * through an SMTP server.
 * 
 * @author www.codejava.net
 * 
 */
@WebServlet("/EmailSendingServlet")
public class EmailSendingServlet extends HttpServlet implements Filter {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final Logger LOGGER = LoggerFactory.getLogger(EmailSendingServlet.class);

	private String host;
	private String port;
	private String user;
	private String pass;

	public void init() {
		// reads SMTP server setting from web.xml file
		ServletContext context = getServletContext();
		host = context.getInitParameter("host");
		port = context.getInitParameter("port");
		user = context.getInitParameter("user");
		pass = context.getInitParameter("pass");
	}

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		// this parses the json
		EmailCompose data = new EmailCompose();
		BufferedReader reader = request.getReader();

		// Configure Gson
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(EmailCompose.class, new EmailDeserializer());
		Gson gson = gsonBuilder.create();

		PrintWriter out = null;
		EmailResponse emailResponse = new EmailResponse();
		// ServletOutputStream out = null;

		try {

			if (reader != null) {
				data = gson.fromJson(reader, EmailCompose.class);
			}

			if (data != null) {
				LOGGER.info("Sending email to " + data.getAddressesTo() + " with subject " + data.getSubject());
				EmailUtility.sendEmail(host, port, user, pass, data.getAddressesAsArray(),
						data.getAddressesBccAsArray(), data.getSubject(), data.getMessage());

				// Confirm mail sending
				emailResponse.setCode(200);
				emailResponse.setStatus("Success");
				emailResponse.setDescription("e-mail was sent successfully");

			}

		} catch (Exception ex) {
			LOGGER.error("Email sending failed: " + ex.getMessage());
			emailResponse.setCode(500);
			emailResponse.setStatus("Failed");
			emailResponse.setDescription(ex.getMessage());
		} finally {
			/*
			 * byte[] bytes = emailResponse.toString().getBytes("utf-8");
			 * response.setContentType("application/json");
			 * response.setCharacterEncoding("utf8");
			 * //response.setContentType("text/html");
			 * response.setContentLength(bytes.length); out =
			 * response.getOutputStream(); out.write(bytes, 0, bytes.length);
			 * 
			 * out.flush(); out.close();
			 */

			out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("utf8");

			Gson gsonPrint = new GsonBuilder().setPrettyPrinting().create();
			String jsonObj = gsonPrint.toJson(emailResponse);
			out.println(jsonObj);

			out.flush();
			out.close();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ServletOutputStream out = null;

		byte[] bytes = "Not supported".getBytes("utf-8");
		response.setContentType("application/json");
		response.setCharacterEncoding("utf8");
		response.setContentLength(bytes.length);
		out = response.getOutputStream();
		out.write(bytes, 0, bytes.length);

		out.flush();
		out.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		System.out.println("Request " + request.getMethod());

		HttpServletResponse resp = (HttpServletResponse) servletResponse;
		resp.addHeader("Access-Control-Allow-Origin", "*");
		resp.addHeader("Access-Control-Allow-Methods", "GET,POST");
		resp.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		// Just ACCEPT and REPLY OK if OPTIONS
		if (request.getMethod().equals("OPTIONS")) {
			resp.setStatus(HttpServletResponse.SC_OK);
			return;
		}
		chain.doFilter(request, servletResponse);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

	@Override
	public void destroy() {
	}

}
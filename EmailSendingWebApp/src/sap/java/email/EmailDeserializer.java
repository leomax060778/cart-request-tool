package sap.java.email;

import java.lang.reflect.Type;
import java.util.Arrays;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

public class EmailDeserializer implements JsonDeserializer<EmailCompose> {

	@Override
	public EmailCompose deserialize(final JsonElement json, final Type typeOfT,
			final JsonDeserializationContext context) throws JsonParseException {

		final JsonObject jsonObject = json.getAsJsonObject();

		final String subject = jsonObject.get("subject").getAsString();
		final String message = jsonObject.get("message").getAsString();

		// Delegate the deserialization to the context
		EmailAddress[] addressesTo = context.deserialize(jsonObject.get("addressTo"), EmailAddress[].class);
		EmailAddress[] addressBcc = context.deserialize(jsonObject.get("addressBcc"), EmailAddress[].class);

		final EmailCompose email = new EmailCompose();
		email.setAddressTo(Arrays.asList(addressesTo));
		email.setAddressBcc(Arrays.asList(addressBcc));
		email.setSubject(subject);
		email.setMessage(message);

		return email;

	}

}

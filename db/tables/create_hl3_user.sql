create column table "CART_REQUEST_TOOL".HL3_USER (
	hl3_id bigint not null,
	user_id bigint not null,
	created_date_tz timestamp default CURRENT_TIMESTAMP,
	modified_date_tz timestamp default null,
	created_user_id bigint not null,
	modified_user_id bigint,
	enabled tinyint default 1,
	deleted tinyint default 0,
	FOREIGN KEY (user_id) REFERENCES "CART_REQUEST_TOOL".USER(user_id),
	FOREIGN KEY (hl3_id) REFERENCES "CART_REQUEST_TOOL".hl3(hl3_id),
	FOREIGN KEY (created_user_id) REFERENCES "CART_REQUEST_TOOL".USER(user_id)
);
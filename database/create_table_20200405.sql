CREATE table merchandise(
	merchandise_id BIGINT NOT NULL AUTO_INCREMENT,
	merchandise_code VARCHAR(100),
	merchandise_name VARCHAR(500),
	cat_group_merchandise_id BIGINT,
	cat_type_merchandise_id BIGINT,
	cat_unit_id BIGINT,
	effective_date DATE,
	expired_date DATE,
	`status` int,
	organization_id BIGINT,
	description VARCHAR(1000),
	url_qr_code VARCHAR(1000),
	created_by VARCHAR(100),
	created_date DATE,
	PRIMARY KEY (merchandise_id)
);

CREATE TABLE growth_process(
	growth_process_id BIGINT NOT NULL AUTO_INCREMENT,
	process_type INT,
	merchandise_id BIGINT NOT NULL,
	start_date DATE,
	end_date DATE,
	address VARCHAR(500),
	client_ip VARCHAR(50),
	organization_id BIGINT,
	description VARCHAR(1000),
	PRIMARY KEY (growth_process_id)
);


CREATE TABLE delivery_process(
	delivery_process_id BIGINT NOT NULL AUTO_INCREMENT,
	merchandise_id BIGINT NOT NULL,
	start_date DATE,
	end_date DATE,
	address VARCHAR(500),
	organization_id BIGINT,
	verified_by VARCHAR(100),
	`status` INT,
	evaluation VARCHAR(1000),
	description VARCHAR(1000),
	document_number VARCHAR(500),
	PRIMARY KEY (delivery_process_id)
);

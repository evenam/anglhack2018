CREATE TABLE Hosts (
	username VARCHAR(40),
	name VARCHAR(40),
	password VARCHAR(40),
	stars INT,
	votes INT,
	photo VARCHAR(40),
	email VARCHAR(40),
	phone VARCHAR(40),
	bedtype VARCHAR(40),
	lat REAL,
	lon REAL
);

CREATE TABLE Guests (
	username VARCHAR(40),
	name VARCHAR(40),
	password VARCHAR(40),
	stars INT,
	votes INT,
	photo VARCHAR(40),
	email VARCHAR(40),
	phone VARCHAR(40)
);

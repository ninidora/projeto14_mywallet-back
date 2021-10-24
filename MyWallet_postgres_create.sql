CREATE TABLE users (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE);

CREATE TABLE sessions (
	"id" serial NOT NULL,
	"uuid" uuid NOT NULL UNIQUE,
	"userID" int NOT NULL UNIQUE,
	"lastping" time with time zone NOT NULL);

CREATE TABLE transactions (
	"userID" int NOT NULL,
	"activityID" serial NOT NULL,
	"amount" money NOT NULL,
	"description" TEXT NOT NULL,
	"date" DATE NOT NULL);
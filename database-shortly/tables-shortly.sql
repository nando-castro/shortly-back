CREATE DATABASE "shortly";

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"token" TEXT NOT NULL UNIQUE,
	"userId" INTEGER UNIQUE NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "links" (
	"id" SERIAL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"shortLink" TEXT NOT NULL UNIQUE,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"views" INTEGER NOT NULL DEFAULT 0,
	"createdAt" TIMESTAMP DEFAULT NOW()
);

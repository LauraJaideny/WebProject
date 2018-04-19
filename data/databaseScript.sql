CREATE DATABASE LauraAdrian;

USE lauraAdrian;

CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL
);

INSERT INTO Users(fName, lName, username, passwrd, email)
VALUES  ('Alfredo', 'Salazar', 'alfredo08', 'alfred90', 'alfred@gmail.com'),
		('Pamela', 'Rodriguez', 'thePam22', '22mapeht', 'pam@gmail.com');

CREATE TABLE Posts (
    postID int NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    comment VARCHAR(200),
    postDate DATE,
    PRIMARY KEY (postID),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Replies (
    replyID int NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    postID int,
    reply VARCHAR(200),
    PRIMARY KEY (replyID),
    FOREIGN KEY (username) REFERENCES Users(username),
    FOREIGN KEY (postID) REFERENCES Posts(postID)
);

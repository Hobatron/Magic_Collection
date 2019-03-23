CREATE DATABASE mtg_collection_db;
USE mtg_collection_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE 1root_cdb (
    id INT NOT NULL AUTO_INCREMENT,
    cardName VARCHAR(255) NOT NULL,
    qnt INT DEFAULT 1,
    imgURL VARCHAR(255),
    isWishList BOOLEAN,
    detailsURL VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
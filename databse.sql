create database store_db;
use store_db;

create table users(
id int auto_increment primary key,
name varchar(60) not null,
email varchar(100) unique not null,
address varchar(400),
password varchar(255) not null,
role enum('ADMIN','USER','OWNER') default 'USER',
created_at timestamp default current_timestamp
);

create table stores(
id int auto_increment primary key,
name varchar(100) not null,
email varchar(100),
address varchar(400),
owner_id int,
foreign key(owner_id) references users(id) on delete cascade);

create table ratings(
id int auto_increment primary key,
user_id int,
store_id int,
rating int check(rating between 1 and 5),
foreign key(store_id) references stores(id) on delete cascade,
unique(user_id,store_id));

select * from users;

show databases;
use store_db;
show tables;

select * from users;

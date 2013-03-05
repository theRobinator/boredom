create user ponguser identified by 'password';
create database pingpong;
GRANT ALL PRIVILEGES ON pingpong.* to ponguser;

use pingpong;

create table users(id int primary key auto_increment, name varchar(32) unique, password varchar(32), wins int unsigned default 0, losses int unsigned default 0, games_played int unsigned default 0);

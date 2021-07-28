create user 3ccert@localhost;
create schema 3ccert;

create table 3ccert.notices (
  id int not null auto_increment primary key,
  title varchar(30) not null,
  content longtext not null,
  createdAt timestamp not null default current_timestamp,
  author varchar(30) not null,
  memberOnly boolean default false
);

grant all on 3ccert.* to 3ccert@localhost;

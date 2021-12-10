create user 3ccert@localhost;
create schema 3ccert;

grant all on 3ccert.* to 3ccert@localhost;
use 3ccert;

CREATE TABLE `users` (
	`user_id`	bigint(15)	NOT NULL,
	`group_id`	bigint(15)	NOT NULL,
	`uesr_name`	varchar(10)	NOT NULL,
	`user_type`	tinyint(1)	NOT NULL	DEFAULT 1	COMMENT '1',
	`user_passwd`	text	NOT NULL,
	`user_salt`	varchar(10)	NOT NULL
);

CREATE TABLE `item` (
	`item_id`	bigint(15)	NOT NULL,
	`item_gn`	text	NOT NULL,
	`item_name`	bigint(15)	NOT NULL,
	`item_point`	int(5)	NOT NULL,
	`item_desc`	text	NULL
);

CREATE TABLE `group` (
	`group_id`	bigint(15)	NOT NULL,
	`group_name`	text	NOT NULL,
	`group_per`	int(1)	NOT NULL	DEFAULT 0
);

CREATE TABLE `verify` (
	`verify_id`	bigint(15)	NOT NULL,
	`user_id`	bigint(15)	NOT NULL,
	`item_id`	bigint(15)	NOT NULL,
	`group_id`	bigint(15)	NOT NULL,
	`verify_status`	int(1)	NOT NULL	DEFAULT 0,
	`verify_created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
	`verify_changed_at`	timestamp	NULL
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`user_id`,
	`group_id`
);

ALTER TABLE `item` ADD CONSTRAINT `PK_ITEM` PRIMARY KEY (
	`item_id`
);

ALTER TABLE `group` ADD CONSTRAINT `PK_GROUP` PRIMARY KEY (
	`group_id`
);

ALTER TABLE `verify` ADD CONSTRAINT `PK_VERIFY` PRIMARY KEY (
	`verify_id`,
	`user_id`,
	`item_id`,
	`group_id`
);

ALTER TABLE `users` ADD CONSTRAINT `FK_group_TO_users_1` FOREIGN KEY (
	`group_id`
)
REFERENCES `group` (
	`group_id`
);

ALTER TABLE `verify` ADD CONSTRAINT `FK_users_TO_verify_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `verify` ADD CONSTRAINT `FK_users_TO_verify_2` FOREIGN KEY (
	`group_id`
)
REFERENCES `users` (
	`group_id`
);

ALTER TABLE `verify` ADD CONSTRAINT `FK_item_TO_verify_1` FOREIGN KEY (
	`item_id`
)
REFERENCES `item` (
	`item_id`
);

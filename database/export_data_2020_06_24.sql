-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.12-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table delivery_db.attachment_file
CREATE TABLE IF NOT EXISTS `attachment_file` (
  `attachment_file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object_id` bigint(20) NOT NULL,
  `file_type` int(11) DEFAULT NULL,
  `file_type_name` varchar(200) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL,
  `sys_language_code` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attachment_file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.cat_group_mechandise
CREATE TABLE IF NOT EXISTS `cat_group_mechandise` (
  `cat_group_mechandise_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_code` varchar(10) NOT NULL DEFAULT '0',
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_date` date DEFAULT NULL,
  PRIMARY KEY (`cat_group_mechandise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.cat_type_mechandise
CREATE TABLE IF NOT EXISTS `cat_type_mechandise` (
  `cat_type_mechandise_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` date DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`cat_type_mechandise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.cat_unit
CREATE TABLE IF NOT EXISTS `cat_unit` (
  `cat_unit_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`cat_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.delivery_process
CREATE TABLE IF NOT EXISTS `delivery_process` (
  `delivery_process_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_id` bigint(20) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `organization_desc_id` bigint(20) DEFAULT NULL,
  `organization_source_id` bigint(20) DEFAULT NULL,
  `verified_by` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `evaluation` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `delivery_by` varchar(1000) DEFAULT NULL,
  `document_number` varchar(500) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`delivery_process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.deliver_seq
CREATE TABLE IF NOT EXISTS `deliver_seq` (
  `deliver_seq_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `current_value` bigint(20) DEFAULT NULL,
  `next_value` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`deliver_seq_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.display_process
CREATE TABLE IF NOT EXISTS `display_process` (
  `display_process_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_id` bigint(20) NOT NULL,
  `organization_id` bigint(20) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `people_processing` varchar(500) DEFAULT NULL,
  `factory` varchar(500) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`display_process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.folder_upload
CREATE TABLE IF NOT EXISTS `folder_upload` (
  `folder_upload_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `server_name` varchar(100) DEFAULT NULL,
  `root_folder` varchar(500) DEFAULT NULL,
  `sub_folder` varchar(500) DEFAULT NULL,
  `file_type` int(11) DEFAULT NULL,
  `file_type_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`folder_upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.growth_process
CREATE TABLE IF NOT EXISTS `growth_process` (
  `growth_process_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_id` bigint(20) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `client_ip` varchar(50) DEFAULT NULL,
  `organization_id` bigint(20) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `process_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`growth_process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.location
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `nation_id` bigint(20) NOT NULL,
  `type` int(11) NOT NULL,
  `parent_id` bigint(20) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28550 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.manufacture_process
CREATE TABLE IF NOT EXISTS `manufacture_process` (
  `manufacture_process_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_id` bigint(20) NOT NULL,
  `organization_id` bigint(20) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `people_processing` varchar(500) DEFAULT NULL,
  `factory` varchar(500) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`manufacture_process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.merchandise
CREATE TABLE IF NOT EXISTS `merchandise` (
  `merchandise_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_code` varchar(100) DEFAULT NULL,
  `merchandise_name` varchar(500) DEFAULT NULL,
  `cat_group_merchandise_id` bigint(20) DEFAULT NULL,
  `cat_type_merchandise_id` bigint(20) DEFAULT NULL,
  `cat_unit_id` bigint(20) DEFAULT NULL,
  `effective_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `organization_id` bigint(20) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `url_qr_code` varchar(1000) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `organization_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`merchandise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.merchandise_register
CREATE TABLE IF NOT EXISTS `merchandise_register` (
  `merchandise_register_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchandise_id` bigint(20) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `organization_id` bigint(20) DEFAULT NULL,
  `organization_path` varchar(500) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`merchandise_register_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.organization
CREATE TABLE IF NOT EXISTS `organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `organization_name` varchar(1000) NOT NULL,
  `organization_path` varchar(500) NOT NULL,
  `parent_code` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_by_group` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `effective_time` datetime DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_code` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `date_of_manufacture` date DEFAULT NULL,
  `quantity` bigint(20) DEFAULT NULL,
  `merchandise_register_id` bigint(20) DEFAULT NULL,
  `orgnization_id` bigint(20) DEFAULT NULL,
  `organization_path` varchar(500) DEFAULT NULL,
  `type_of_manufacture` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_actions_control
CREATE TABLE IF NOT EXISTS `sys_actions_control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action_name` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `text_html` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_parameter
CREATE TABLE IF NOT EXISTS `sys_parameter` (
  `sys_parameter_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  PRIMARY KEY (`sys_parameter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_resource
CREATE TABLE IF NOT EXISTS `sys_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `component` varchar(50) DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `parent_code` varchar(10) DEFAULT NULL,
  `path_url` varchar(50) DEFAULT NULL,
  `resource_name` varchar(255) NOT NULL,
  `type_of_resource` int(11) NOT NULL,
  `key_tree` varchar(20) DEFAULT NULL,
  `orther_control` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orther_control`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_resource_control
CREATE TABLE IF NOT EXISTS `sys_resource_control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `control_code` varchar(20) NOT NULL,
  `resource_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_role
CREATE TABLE IF NOT EXISTS `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `sys_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.sys_role_permission
CREATE TABLE IF NOT EXISTS `sys_role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `has_add` bit(1) DEFAULT NULL,
  `has_approve` bit(1) DEFAULT NULL,
  `has_delete` bit(1) DEFAULT NULL,
  `has_edit` bit(1) DEFAULT NULL,
  `orther_control` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orther_control`)),
  `resource_code` varchar(20) DEFAULT NULL,
  `role_code` varchar(20) DEFAULT NULL,
  `has_view` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `age` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salary` bigint(20) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `organization_code` varchar(255) DEFAULT NULL,
  `type_of_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table delivery_db.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `role_code` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for view delivery_db.v_product_process
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_product_process` (
	`objectId` BIGINT(20) NOT NULL,
	`startDate` DATE NULL,
	`endDate` DATE NULL,
	`organizationName` VARCHAR(1000) NULL COLLATE 'utf8_general_ci',
	`peopleProcessing` VARCHAR(500) NULL COLLATE 'utf8_general_ci',
	`factory` VARCHAR(500) NULL COLLATE 'utf8_general_ci',
	`organizationDescName` VARCHAR(1000) NULL COLLATE 'utf8_general_ci',
	`organizationSourceName` VARCHAR(1000) NULL COLLATE 'utf8_general_ci',
	`evaluation` VARCHAR(1000) NULL COLLATE 'utf8_general_ci',
	`documentNumber` VARCHAR(500) NULL COLLATE 'utf8_general_ci',
	`description` VARCHAR(1000) NULL COLLATE 'utf8_general_ci',
	`typeProcess` INT(1) NOT NULL,
	`productId` BIGINT(20) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for view delivery_db.v_product_process
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_product_process`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_product_process` AS SELECT *
FROM (
	SELECT gp.growth_process_id objectId, gp.start_date startDate, gp.end_date endDate
	, (
	SELECT org.organization_name
	FROM organization org
	WHERE org.id = gp.organization_id) organizationName
	, NULL peopleProcessing
	, NULL factory
	, NULL organizationDescName
	, NULL organizationSourceName
	, NULL evaluation
	, NULL documentNumber
	, NULL description
	, 1 typeProcess
	, gp.merchandise_id productId
	FROM growth_process gp
	 UNION ALL
	SELECT mp.manufacture_process_id objectId, mp.start_date startDate, mp.end_date endDate
	, (
	SELECT org.organization_name
	FROM organization org
	WHERE org.id = mp.organization_id) organizationName
	, mp.people_processing peopleProcessing
	, mp.factory
	, NULL organizationDescName
	, NULL organizationSourceName
	, NULL evaluation
	, NULL documentNumber
	, NULL description
	, 2 typeProcess
		, mp.merchandise_id productId
	FROM manufacture_process mp
	UNION ALL
	SELECT dp.delivery_process_id objectId, dp.start_date startDate, dp.end_date endDate
	, NULL organizationName
	, NULL peopleProcessing
	, NULL factory
	, (
	SELECT org.organization_name
	FROM organization org
	WHERE org.id = dp.organization_desc_id) organizationDescName
	, (
	SELECT org.organization_name
	FROM organization org
	WHERE org.id = dp.organization_source_id) organizationSourceName
	, dp.evaluation
	, dp.document_number documentNumber
	, dp.description
	, 3 typeProcess
	, dp.merchandise_id productId
	FROM delivery_process dp
 UNION ALL
	SELECT dip.display_process_id objectId, dip.start_date startDate, dip.end_date endDate
	, (
	SELECT org.organization_name
	FROM organization org
	WHERE org.id = dip.organization_id) organizationName
	, dip.people_processing peopleProcessing
	, dip.factory factory
	, NULL organizationDescName
	, NULL organizationSourceName
	, NULL evaluation
	, NULL documentNumber
	, NULL description
	, 4 typeProcess
	, dip.merchandise_id productId
	FROM display_process dip
) tb ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

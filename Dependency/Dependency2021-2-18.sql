# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.4.11-MariaDB)
# Database: Dependency
# Generation Time: 2021-02-18 10:37:06 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table CODE_RULES
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CODE_RULES`;

CREATE TABLE `CODE_RULES` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CODE` varchar(4) DEFAULT NULL,
  `SPEC` varchar(20) DEFAULT NULL,
  `USECHINEYEAR` int(1) NOT NULL DEFAULT 0,
  `USEDAYCODE` int(1) NOT NULL DEFAULT 1,
  `USETIME` int(1) NOT NULL DEFAULT 0,
  `NUMYCODE` int(1) NOT NULL DEFAULT 4,
  `NUMMCODE` int(1) NOT NULL DEFAULT 2,
  `CODENUM` int(1) NOT NULL DEFAULT 4,
  `CODETABLE` varchar(30) DEFAULT NULL,
  `CODECOLUMN` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `CODE_RULES` WRITE;
/*!40000 ALTER TABLE `CODE_RULES` DISABLE KEYS */;

INSERT INTO `CODE_RULES` (`id`, `CODE`, `SPEC`, `USECHINEYEAR`, `USEDAYCODE`, `USETIME`, `NUMYCODE`, `NUMMCODE`, `CODENUM`, `CODETABLE`, `CODECOLUMN`)
VALUES
	(1,'AA','Test',0,1,0,4,2,3,'ORDERS','ORDERNO');

/*!40000 ALTER TABLE `CODE_RULES` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table COMPANY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `COMPANY`;

CREATE TABLE `COMPANY` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(10) DEFAULT NULL,
  `PhoneNum` varchar(12) DEFAULT NULL,
  `Email` varchar(40) DEFAULT NULL,
  `LineID` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `COMPANY` WRITE;
/*!40000 ALTER TABLE `COMPANY` DISABLE KEYS */;

INSERT INTO `COMPANY` (`ID`, `Name`, `PhoneNum`, `Email`, `LineID`)
VALUES
	(1,'廠商1','0901-153-288','abcd@gmail.com','company1'),
	(2,'廠商2','0902-246-387','1234@gmail.com','company2');

/*!40000 ALTER TABLE `COMPANY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOMER`;

CREATE TABLE `CUSTOMER` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) DEFAULT NULL,
  `LineID` varchar(25) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Email` varchar(40) DEFAULT NULL,
  `Sex` int(1) DEFAULT 0,
  `Birthday` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table ORDER_ITEMS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ORDER_ITEMS`;

CREATE TABLE `ORDER_ITEMS` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OrderNO` varchar(20) NOT NULL DEFAULT '',
  `ProductID` int(11) NOT NULL,
  `UnitPrice` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Remark` varchar(100) DEFAULT NULL,
  `Remark_plus` int(11) DEFAULT NULL,
  `Remark_minus` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `ORDER_ITEMS` WRITE;
/*!40000 ALTER TABLE `ORDER_ITEMS` DISABLE KEYS */;

INSERT INTO `ORDER_ITEMS` (`ID`, `OrderNO`, `ProductID`, `UnitPrice`, `Quantity`, `Remark`, `Remark_plus`, `Remark_minus`)
VALUES
	(1,'AA20210122001',1,100,2,'[null,true]',0,0),
	(2,'AA20210122001',3,260,2,'[]',100,200),
	(3,'AA20210122001',2,220,2,'[true]',0,0),
	(4,'AA20210122002',8,130,2,'[]',0,0),
	(5,'AA20210122002',12,140,2,'[]',0,0),
	(10,'AA20210126001',12,140,2,'[]',0,0),
	(11,'AA20210126001',8,130,2,'[]',0,0),
	(12,'AA20210126001',2,220,2,'[]',0,0),
	(13,'AA20210126001',7,120,2,'[]',0,0),
	(14,'AA20210126001',6,100,2,'[]',0,0),
	(15,'AA20210126001',9,80,4,'[]',0,0),
	(16,'AA20210126001',14,200,2,'[]',0,0),
	(17,'AA20210206001',1,100,2,'[]',0,0),
	(18,'AA20210206001',2,220,2,'[]',0,0),
	(19,'AA20210206001',7,120,2,'[]',0,0),
	(20,'AA20210206001',8,130,2,'[]',0,0),
	(21,'AA20210206001',14,200,2,'[]',0,0),
	(24,'AA20210206003',1,100,3,'[]',0,0),
	(25,'AA20210206003',2,220,2,'[]',0,0),
	(26,'AA20210206003',5,80,2,'[]',0,0),
	(27,'AA20210206003',25,100,1,'[]',0,0),
	(28,'AA20210122003',0,90,2,'[null,true]',100,200),
	(29,'AA20210122003',1,100,3,'[]',0,0),
	(30,'AA20210122003',2,130,4,'[]',0,0),
	(31,'AA20210122003',3,120,4,'[]',0,0),
	(32,'AA20210122003',7,120,3,'[]',100,0),
	(43,'AA20210206002',12,80,2,'[true]',0,0),
	(44,'AA20210206002',13,140,4,'[true,true]',0,0),
	(45,'AA20210206002',9,80,1,'[true]',0,30),
	(46,'AA20210206002',5,80,1,'[null,true]',20,0);

/*!40000 ALTER TABLE `ORDER_ITEMS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ORDERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ORDERS`;

CREATE TABLE `ORDERS` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OrderNO` varchar(20) DEFAULT NULL,
  `Count` int(11) DEFAULT NULL,
  `Discount` int(11) DEFAULT NULL,
  `TotalPrice` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `State` int(1) DEFAULT 1 COMMENT '1-處理中 ｜ 2-完成 ｜ 3-取消',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `ORDERS` WRITE;
/*!40000 ALTER TABLE `ORDERS` DISABLE KEYS */;

INSERT INTO `ORDERS` (`ID`, `OrderNO`, `Count`, `Discount`, `TotalPrice`, `CreateDate`, `UpdateDate`, `State`)
VALUES
	(1,'AA20210122001',6,159,1060,'2021-01-22 19:03:26','2021-02-06 13:08:44',2),
	(2,'AA20210122002',4,0,540,'2021-01-22 19:14:00','2021-02-06 13:13:53',3),
	(3,'AA20210122003',16,0,1840,'2021-01-22 19:15:26','2021-02-18 17:22:45',3),
	(4,'AA20210126001',16,0,2140,'2021-01-26 18:01:03',NULL,1),
	(5,'AA20210206001',10,0,1540,'2021-02-06 13:17:39',NULL,1),
	(6,'AA20210206002',8,0,870,'2021-02-06 13:22:01','2021-02-18 17:44:55',1),
	(7,'AA20210206003',8,0,1000,'2021-02-06 13:29:53','2021-02-06 14:10:51',3);

/*!40000 ALTER TABLE `ORDERS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PRODUCT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PRODUCT`;

CREATE TABLE `PRODUCT` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(40) DEFAULT NULL,
  `UnitPrice` int(11) DEFAULT NULL,
  `State` int(1) DEFAULT 0,
  `Type` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `PRODUCT` WRITE;
/*!40000 ALTER TABLE `PRODUCT` DISABLE KEYS */;

INSERT INTO `PRODUCT` (`ID`, `Name`, `UnitPrice`, `State`, `Type`)
VALUES
	(1,'耶加雪非',100,0,7),
	(2,'瓜地馬拉',220,1,7),
	(3,'哥斯大黎加',260,2,7),
	(4,'衣索比亞 古吉 G1日曬',120,0,1),
	(5,'蜂蜜檸檬氣泡飲',80,0,2),
	(6,'熱帶鳳梨氣泡飲',80,0,2),
	(7,'天使之鈴 可麗露',120,0,3),
	(8,'蕉香可可亞蛋糕',130,0,3),
	(9,'艾莉希亞檸檬蛋糕',80,0,3),
	(10,'布列塔尼酥餅',60,0,3),
	(11,'巧克力瑪芬',90,0,3),
	(12,'橙香瑪德蓮',140,0,3),
	(13,'肉桂捲',160,0,3),
	(14,'布朗尼',200,0,3),
	(15,'女王經典原味司康',90,0,3),
	(16,'瓜地馬拉 薇薇特南果    水洗',120,0,1),
	(17,'美式咖啡 ',60,0,4),
	(18,'原味經典拿鐵',80,0,4),
	(19,'經典卡布奇諾',80,0,4),
	(20,'夏威夷榛果拿鐵',90,0,4),
	(21,'典藏焦糖瑪琪朵',90,0,4),
	(22,'大理石竹炭拿鐵',90,0,4),
	(23,'經典義式摩卡',90,0,4),
	(24,'依賴咖啡茶卡布',100,0,4),
	(25,'南非國寶茶',100,0,5),
	(26,'桑椹氣泡飲',80,0,2),
	(28,'伯爵紅茶拿鐵',60,0,6),
	(29,'焦糖紅茶拿鐵',80,0,6),
	(30,'法式巧克力牛奶',80,0,6),
	(31,'單品美式',80,0,4);

/*!40000 ALTER TABLE `PRODUCT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PRODUCT_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PRODUCT_TYPE`;

CREATE TABLE `PRODUCT_TYPE` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `PRODUCT_TYPE` WRITE;
/*!40000 ALTER TABLE `PRODUCT_TYPE` DISABLE KEYS */;

INSERT INTO `PRODUCT_TYPE` (`ID`, `Name`)
VALUES
	(0,'ALL'),
	(1,'單品咖啡'),
	(2,'特調飲品'),
	(3,'甜點'),
	(4,'義式咖啡'),
	(5,'鮮萃茶'),
	(6,'經典奶茶/牛奶'),
	(7,'咖啡豆');

/*!40000 ALTER TABLE `PRODUCT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table REMARK_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REMARK_TYPE`;

CREATE TABLE `REMARK_TYPE` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `REMARK_TYPE` WRITE;
/*!40000 ALTER TABLE `REMARK_TYPE` DISABLE KEYS */;

INSERT INTO `REMARK_TYPE` (`ID`, `Name`)
VALUES
	(1,'冰'),
	(2,'熱');

/*!40000 ALTER TABLE `REMARK_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USERINFO
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USERINFO`;

CREATE TABLE `USERINFO` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(10) DEFAULT NULL,
  `Account` varchar(20) DEFAULT NULL,
  `Password` varchar(20) DEFAULT NULL,
  `PhoneNum` varchar(10) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Mail` varchar(50) DEFAULT NULL,
  `LastLogin` text DEFAULT NULL,
  `IP` varchar(15) DEFAULT NULL,
  `Used` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `USERINFO` WRITE;
/*!40000 ALTER TABLE `USERINFO` DISABLE KEYS */;

INSERT INTO `USERINFO` (`ID`, `Name`, `Account`, `Password`, `PhoneNum`, `Address`, `Mail`, `LastLogin`, `IP`, `Used`)
VALUES
	(1,'Haven','admin','abcd1234',NULL,NULL,NULL,'2021-02-04 21:35:30','127.0.0.1',1);

/*!40000 ALTER TABLE `USERINFO` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table view_undoneorderlist
# ------------------------------------------------------------

DROP VIEW IF EXISTS `view_undoneorderlist`;

CREATE TABLE `view_undoneorderlist` (
   `OrderNO` VARCHAR(20) NULL DEFAULT NULL,
   `TotalPrice` INT(11) NULL DEFAULT NULL,
   `Count` INT(11) NULL DEFAULT NULL,
   `Discount` INT(11) NULL DEFAULT NULL,
   `CreateDate` DATETIME NULL DEFAULT NULL,
   `ProductID` INT(11) UNSIGNED NULL DEFAULT '0',
   `Name` VARCHAR(40) NULL DEFAULT NULL,
   `UnitPrice` INT(11) NULL DEFAULT NULL,
   `Quantity` INT(11) NULL DEFAULT NULL,
   `Remark` VARCHAR(100) NULL DEFAULT NULL,
   `Remark_plus` INT(11) NULL DEFAULT NULL,
   `Remark_minus` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;





# Replace placeholder table for view_undoneorderlist with correct view syntax
# ------------------------------------------------------------

DROP TABLE `view_undoneorderlist`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dependency`.`view_undoneorderlist`
AS SELECT
   `a`.`OrderNO` AS `OrderNO`,
   `a`.`TotalPrice` AS `TotalPrice`,
   `a`.`Count` AS `Count`,
   `a`.`Discount` AS `Discount`,
   `a`.`CreateDate` AS `CreateDate`,
   `c`.`ID` AS `ProductID`,
   `c`.`Name` AS `Name`,
   `b`.`UnitPrice` AS `UnitPrice`,
   `b`.`Quantity` AS `Quantity`,
   `b`.`Remark` AS `Remark`,
   `b`.`Remark_plus` AS `Remark_plus`,
   `b`.`Remark_minus` AS `Remark_minus`
FROM ((`dependency`.`orders` `a` left join `dependency`.`order_items` `b` on(`a`.`OrderNO` = `b`.`OrderNO`)) left join `dependency`.`product` `c` on(`b`.`ProductID` = `c`.`ID`)) where `a`.`State` = 1;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

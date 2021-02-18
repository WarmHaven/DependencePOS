# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.4.11-MariaDB)
# Database: Dependency
# Generation Time: 2021-02-18 10:38:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



--
-- Dumping routines (PROCEDURE) for database 'Dependency'
--
DELIMITER ;;

# Dump of PROCEDURE CreateNewOrder
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `CreateNewOrder` */;;
/*!50003 SET SESSION SQL_MODE="STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `CreateNewOrder`(
in codeNamePre char(2), -- 打頭碼
in codeTable varchar(40), -- 編碼規則的Table
in orderCount int, -- 訂單 項目
in orderDiscount int, -- 訂單 折扣
in orderTotalPrice int, -- 訂單 金額
-- in num int, 
out newOrderNo varchar(25)
)
BEGIN  
  DECLARE currentDate VARCHAR (15) ;-- 當前日期 
  DECLARE chY VARCHAR(3);  
  DECLARE maxNo INT DEFAULT 0 ; -- 最後單據號碼的流水號
  DECLARE oldCodeNo VARCHAR (25) DEFAULT '' ;-- 最後單據號碼  
--   DECLARE newOrderNo varchar(25);
  
  DECLARE rUseCHNYear int(1); -- 是否使用 國曆年
  DECLARE rUseDay int(1); -- 是否使用 日
  DECLARE rUseTime int(1); -- 是否使用 時間
  DECLARE rYear int(1); -- CODE_RULES 年碼字數
  DECLARE rMonth int(1); -- CODE_RULES 月碼字數
  DECLARE rDay int(1); -- CODE_RULES 日碼字數
  DECLARE rNum int(1); -- CODE_RULES 流水號字數

  DECLARE dateRulesY VARCHAR(2) DEFAULT "";
  DECLARE dateRulesM VARCHAR(2) DEFAULT "%m";
  DECLARE dateRulesD VARCHAR(2) DEFAULT "";
  DECLARE dateRulesTime VARCHAR(4) DEFAULT "";
 
  DECLARE selectSQL TEXT(1000);
  DECLARE insertSQL TEXT(1000);
  DECLARE code_Column VARCHAR(30);
  
  -- exception
  DECLARE exit handler for SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
     @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
    SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
    SELECT @full_error;
  END;
  -- 從CODE_RULES 取得對應的編碼規則
  SELECT USECHINEYEAR, USEDAYCODE, USETIME, NUMYCODE, NUMMCODE, CODENUM, CODECOLUMN 
  INTO rUseCHNYear, rUseDay, rUseTime, rYear, rMonth, rNum, code_Column   
  FROM CODE_RULES
  WHERE CODE=codeNamePre AND CODETABLE=codeTable;

  -- 設定日期編碼格式
  if rYear=2 then
    set dateRulesY = "%y";
  else
    set dateRulesY = "%Y";
  end if;

  if rUseDay=1 then
    set dateRulesD = "%d";
  end if;
  if rUseTime=1 then
    set dateRulesTime = "%H%i";
  end if;
  
  SELECT DATE_FORMAT(NOW(), CONCAT(dateRulesY, dateRulesM, dateRulesD, dateRulesTime)) INTO currentDate ;

 
  if rUseCHNYear=1 then
  	if rYear = 4 then
	    set chY = LEFT(currentDate,4)-1911;
	    set currentDate = CONCAT( chY, SUBSTRING(currentDate,5));
-- 	    SELECT SUBSTRING(currentDate,5), chY, currentDate;
	elseif rYear <= 3 then
		set chY = RIGHT(DATE_FORMAT(NOW(),"%Y")-1911,3);		
		set currentDate = CONCAT( chY, SUBSTRING(currentDate,3,5));
-- 		SELECT SUBSTRING(currentDate,5), chY, currentDate;
	end if;
  end if;
 
  -- 搜尋 最近一次的流水號
  set @outvar = '';
  set selectSQL = CONCAT('SELECT IFNULL(',code_Column,', ''',''') into @outvar FROM `Dependency`.`',codeTable,
      '` WHERE SUBSTRING(',code_Column,', 3, length(''',currentDate,''')) = ''',currentDate,
      ''' AND SUBSTRING(',code_Column,', 1, 2) = ''',codeNamePre,''' and length(',code_Column,
      ') = 2 + ',rNum,' + length(''',currentDate,''') ORDER BY id DESC LIMIT 1 ');
--   select selectSQL;
  PREPARE stmt FROM selectSQL;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
--   select @outvar ;
  select @outvar into oldCodeNo;

  -- 設定 新流水號
  IF oldCodeNo != '' THEN   
    SET maxNo = CONVERT(SUBSTRING(oldCodeNo, -rNum), DECIMAL) ;-- SUBSTRING(oldOrderNo, -5)：订单编号如果不为‘‘截取订单的最后5位   
  END IF ;  
  -- 組合各個組件 -> 新編碼
  SELECT   
    CONCAT(codeNamePre, currentDate,  LPAD((maxNo + 1), rNum, '0')) INTO newOrderNo ; -- LPAD((maxNo + 1), 5, '0')：如果不足5位，将用0填充左边   
  
  -- 插入訂單
  set insertSQL = CONCAT('INSERT INTO ',codeTable,' (',code_Column,', Count, Discount, TotalPrice, CreateDate) VALUES (''',
  						 newOrderNo,''', ', orderCount,', ', orderDiscount,', ', orderTotalPrice, ', NOW())');
--   select insertSQL;
  PREPARE stmt FROM insertSQL;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
--   SELECT newOrderNo, orderCount, orderDiscount, orderTotalPrice ;  
  SELECT newOrderNo;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE GetCodeNo
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `GetCodeNo` */;;
/*!50003 SET SESSION SQL_MODE="STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `GetCodeNo`(
in codeNamePre char(2), -- 打頭碼
in codeTable varchar(40), -- 編碼規則的Table
out newOrderNo varchar(25)
)
BEGIN  
  DECLARE currentDate VARCHAR (15) ;-- 當前日期 
  DECLARE chY VARCHAR(3);  
  DECLARE maxNo INT DEFAULT 0 ; -- 最後單據號碼的流水號
  DECLARE oldCodeNo VARCHAR (25) DEFAULT '' ;-- 最後單據號碼  
--   DECLARE newOrderNo varchar(25);
  
  DECLARE rUseCHNYear int(1); -- 是否使用 國曆年
  DECLARE rUseDay int(1); -- 是否使用 日
  DECLARE rUseTime int(1); -- 是否使用 時間
  DECLARE rYear int(1); -- CODE_RULES 年碼字數
  DECLARE rMonth int(1); -- CODE_RULES 月碼字數
  DECLARE rDay int(1); -- CODE_RULES 日碼字數
  DECLARE rNum int(1); -- CODE_RULES 流水號字數

  DECLARE dateRulesY VARCHAR(2) DEFAULT ""; 
  DECLARE dateRulesM VARCHAR(2) DEFAULT "%m";
  DECLARE dateRulesD VARCHAR(2) DEFAULT "";
  DECLARE dateRulesTime VARCHAR(4) DEFAULT "";
 
  DECLARE selectSQL TEXT(1000);
  DECLARE insertSQL TEXT(1000);
  DECLARE code_Column VARCHAR(30);
  
  -- exception
  DECLARE exit handler for SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
     @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
    SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
    SELECT @full_error;
  END;
  
  -- 從CODE_RULES 取得對應的編碼規則
  SELECT USECHINEYEAR, USEDAYCODE, USETIME, NUMYCODE, NUMMCODE, CODENUM, CODECOLUMN 
  INTO rUseCHNYear, rUseDay, rUseTime, rYear, rMonth, rNum, code_Column   
  FROM CODE_RULES
  WHERE CODE=codeNamePre AND CODETABLE=codeTable;

  -- 設定日期編碼格式
  if rYear=2 then
    set dateRulesY = "%y";
  else
    set dateRulesY = "%Y";
  end if;

  if rUseDay=1 then
    set dateRulesD = "%d";
  end if;
  if rUseTime=1 then
    set dateRulesTime = "%H%i";
  end if;
  
  SELECT DATE_FORMAT(NOW(), CONCAT(dateRulesY, dateRulesM, dateRulesD, dateRulesTime)) INTO currentDate ;

  
  if rUseCHNYear=1 then
  	if rYear = 4 then
	    set chY = LEFT(currentDate,4)-1911;
	    set currentDate = CONCAT( chY, SUBSTRING(currentDate,5));
-- 	    SELECT SUBSTRING(currentDate,5), chY, currentDate;
  	elseif rYear <= 3 then
  		set chY = RIGHT(DATE_FORMAT(NOW(),"%Y")-1911,3);		
  		set currentDate = CONCAT( chY, SUBSTRING(currentDate,3,5));
  -- 		SELECT SUBSTRING(currentDate,5), chY, currentDate;
  	end if;
  end if;
 
  -- 搜尋 最近一次的流水號
  set @outvar = '';
  set selectSQL = CONCAT('SELECT IFNULL(',code_Column,', ''',''') into @outvar FROM `Dependency`.`',codeTable,
      '` WHERE SUBSTRING(',code_Column,', 3, length(''',currentDate,''')) = ''',currentDate,
      ''' AND SUBSTRING(',code_Column,', 1, 2) = ''',codeNamePre,''' and length(',code_Column,
      ') = 2 + ',rNum,' + length(''',currentDate,''') ORDER BY id DESC LIMIT 1 ');
--   select selectSQL;
  PREPARE stmt FROM selectSQL;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
--   select @outvar ;
  select @outvar into oldCodeNo;

  -- 設定 新流水號
  IF oldCodeNo != '' THEN   
    SET maxNo = CONVERT(SUBSTRING(oldCodeNo, -rNum), DECIMAL) ;-- SUBSTRING(oldOrderNo, -5)：订单编号如果不为‘‘截取订单的最后5位   
  END IF ;  
  -- 組合各個組件 -> 新編碼
  SELECT   
    CONCAT(codeNamePre, currentDate,  LPAD((maxNo + 1), rNum, '0')) INTO newOrderNo ; -- LPAD((maxNo + 1), 5, '0')：如果不足5位，将用0填充左边    
  
  SELECT newOrderNo;
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

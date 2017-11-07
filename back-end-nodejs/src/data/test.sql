-- MySQL dump 10.13  Distrib 5.7.13, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `test`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `test` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `test`;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` enum('COMPANY','PERSONAL') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('03dd0314-01cd-441e-80dd-25320e9f5e63','Accenture Inc.','COMPANY'),('5fc751f7-88be-4b9f-ad85-35819aca555d','IBM Solutions Delivery Inc.','COMPANY'),('9d1170f9-9ac5-4e34-bacc-4b4d0909e65c','IDESS Interactive Technologies Inc.','COMPANY'),('c06ad7b4-29b5-46a7-8aa1-6e5a22d851df','Owens Asia Inc.','COMPANY'),('de925655-99f2-4cc8-8735-4b1f75b137f5','Friends of Jess','PERSONAL');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `account_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` enum('MAILING','BILLING') DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES ('28e1c942-fbff-4646-9f70-f144c5588657','118 Purok 2 Lacmit','Arayat','Pampanga','Philippines','2012','de925655-99f2-4cc8-8735-4b1f75b137f5','MAILING','+63 923 210 4978'),('7f3457dc-4c73-4688-8042-f17d9cc436ec','PhilExcel Business Center','Clarkfield','Pampanga','Philippines','2000','c06ad7b4-29b5-46a7-8aa1-6e5a22d851df','MAILING',NULL),('89eb7ef2-6449-438b-a5a9-caaa50a99c50','Upper Cubi','Subic Bay','Freeport Zone','Philippines','11111','9d1170f9-9ac5-4e34-bacc-4b4d0909e65c','MAILING',''),('bf7fb711-f76a-4817-aa8e-66a548b070e6','01 5th Floor Accenture Tower Eastwood City','Quezon City',NULL,'Philippines','1110','03dd0314-01cd-441e-80dd-25320e9f5e63','MAILING','+632-433-09-212'),('f360d554-86fe-4a0b-98c2-2b3e270ccfb9','08 7th Floor IBM Plaza Eastwood City','Quezon City',NULL,'Philippines','1110','5fc751f7-88be-4b9f-ad85-35819aca555d','MAILING','+632-433-11-222');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fname` varchar(255) NOT NULL,
  `mname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `account_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1cc06dbe-32e2-4e50-a7ef-1bdf5d2b5393','Jayson','','Pingol','pingol@yahoo.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('2051bb85-4c7b-4675-8218-f60ab1f54af4','Roman','','Calma','rcalma@gmail.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('3ab02951-da76-48f0-a414-733f9a59be06','Ern Andrew','','Gregorio','gregorioe@ph.ibm.com',NULL,'5fc751f7-88be-4b9f-ad85-35819aca555d'),('4ac6dbf4-0b1c-4b1e-b998-ae97492cd084','Jesus','Pangan','Lising','lisingj@ph.ibm.com','1234567','5fc751f7-88be-4b9f-ad85-35819aca555d'),('62d693a9-ff80-4b4c-9f6a-d8e2e4a1a7df','Michael','','Guttierrez','mguttierez@yahoo.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('84c6bb62-a02c-45c4-8f36-94dc4ac9b2d3','Marlon','','Calma','mcalma@yahoo.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('86aef5ef-952d-48f1-adff-c3336154994c','William','','Navarro','navarrw@ph.ibm.com',NULL,'5fc751f7-88be-4b9f-ad85-35819aca555d'),('c3c422d6-9362-4fa5-b871-866696b0ca16','Arnel','','Tazo','atazo@yahoo.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('c3d809db-7d7f-4420-a7e3-57fe97e4ff01','Joel','','Mamangun','jmamangun@gmail.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('cf96a41d-2f1d-43b1-abe9-29730d8ee5da','Erwin','','Aldana','ealdana@yahoo.com',NULL,'de925655-99f2-4cc8-8735-4b1f75b137f5'),('d018eef5-d07d-426d-9aa1-87ec2ee0f576','Romel',NULL,'Palasigue','rpalasigue@accenture.com',NULL,'03dd0314-01cd-441e-80dd-25320e9f5e63');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-27  1:02:40

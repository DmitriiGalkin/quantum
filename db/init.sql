-- MySQL dump 10.13  Distrib 8.0.32, for macos11.7 (x86_64)
--
-- Host: localhost    Database: quantum
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `salary` decimal(11,2) unsigned DEFAULT '0.00',
  `status` tinyint unsigned DEFAULT '0',
  `is_deleted` tinyint unsigned DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'John','Doe','johndoe@gmail.com','1234567890','BR Softech Pvt Ltd','Full Stack Developer',500.00,1,0,'2019-11-19 03:30:30','2023-02-23 20:05:06'),(2,'Jane','Doe','janedoe@gmail.com','9876543210','RG Infotech Jaipur','PHP Developer',450.00,1,0,'2019-11-19 03:35:30','2023-02-23 20:05:09');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meet`
--

DROP TABLE IF EXISTS `meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meet` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `projectId` bigint NOT NULL,
  `active` tinyint unsigned DEFAULT '0' COMMENT 'deprecated',
  `datetime` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meet`
--

LOCK TABLES `meet` WRITE;
/*!40000 ALTER TABLE `meet` DISABLE KEYS */;
INSERT INTO `meet` VALUES (1,1,0,'2023-02-13 14:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(2,2,0,'2023-02-13 15:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(3,2,0,'2023-02-13 16:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(4,2,0,'2023-02-13 17:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(5,3,0,'2023-02-13 18:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(6,4,0,'2023-02-13 19:00:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(7,7,0,'2023-02-13 20:15:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(8,7,0,'2023-02-13 21:30:57','2023-02-13 04:43:57','2023-02-25 01:36:46'),(9,7,0,'2023-02-14 14:00:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(10,5,0,'2023-02-14 15:00:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(11,10,0,'2023-02-14 16:00:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(12,10,0,'2023-02-14 17:30:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(13,5,0,'2023-02-14 18:00:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(14,5,0,'2023-02-14 19:00:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(15,5,0,'2023-02-15 20:40:57','2023-02-13 04:43:57','2023-02-25 01:43:21'),(16,12,0,'2023-02-27 18:30:14','2023-02-27 18:30:27','2023-02-27 18:30:27'),(17,5,0,'2023-02-28 17:30:54','2023-02-28 17:49:33','2023-03-02 20:39:29'),(18,3,0,'2023-03-01 12:15:32','2023-03-01 12:22:07','2023-03-02 20:39:29'),(19,3,0,'2023-03-03 12:35:00','2023-03-03 12:36:07','2023-03-03 12:36:07'),(20,3,0,'2023-03-12 11:15:00','2023-03-03 12:38:01','2023-03-03 12:38:01'),(21,3,0,'2023-03-05 13:00:00','2023-03-03 23:46:58','2023-03-03 23:46:58'),(22,3,0,'2023-03-10 10:30:00','2023-03-03 23:53:25','2023-03-03 23:53:25'),(23,10,0,'2023-04-03 10:00:00','2023-03-03 23:54:36','2023-03-20 18:13:04'),(24,3,0,'2023-04-07 10:00:00','2023-03-07 20:47:28','2023-03-20 18:13:04'),(25,1,0,'2023-04-20 10:00:00','2023-03-20 17:19:46','2023-03-20 18:13:04');
/*!40000 ALTER TABLE `meet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_meet`
--

DROP TABLE IF EXISTS `user_meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_meet` (
  `userId` bigint NOT NULL,
  `meetId` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_meet`
--

LOCK TABLES `user_meet` WRITE;
/*!40000 ALTER TABLE `user_meet` DISABLE KEYS */;
INSERT INTO `user_meet` VALUES (3,1,'2023-02-24 20:27:15'),(4,1,'2023-02-24 20:27:15'),(5,1,'2023-02-24 20:27:15'),(2,2,'2023-02-24 20:44:42'),(5,2,'2023-02-24 20:44:42'),(2,3,'2023-02-24 20:44:42'),(5,3,'2023-02-24 20:44:42'),(2,4,'2023-02-24 20:44:42'),(5,4,'2023-02-24 20:44:42'),(4,5,'2023-02-24 20:44:42'),(1,16,'2023-03-02 17:28:01'),(1,17,'2023-03-03 23:47:54'),(1,8,'2023-03-04 00:33:13'),(1,11,'2023-03-08 21:27:01'),(1,6,'2023-03-08 22:54:17'),(1,23,'2023-03-08 23:11:17'),(3,5,'2023-03-09 16:50:33'),(3,2,'2023-03-09 16:51:49'),(3,4,'2023-03-09 16:54:08'),(3,6,'2023-03-09 16:54:10'),(3,17,'2023-03-09 16:54:14'),(1,2,'2023-03-09 18:05:11'),(15,24,'2023-03-10 22:58:20'),(15,21,'2023-03-10 23:07:23'),(15,18,'2023-03-10 23:10:23'),(15,5,'2023-03-10 23:10:44'),(16,19,'2023-03-11 11:12:21'),(16,18,'2023-03-11 11:12:21'),(16,5,'2023-03-11 11:12:24'),(16,6,'2023-03-11 11:14:16'),(2,19,'2023-03-11 11:17:54'),(2,20,'2023-03-11 11:18:12'),(2,22,'2023-03-11 11:18:24'),(2,21,'2023-03-11 11:18:25'),(2,24,'2023-03-11 11:18:27'),(2,18,'2023-03-20 17:12:22'),(2,1,'2023-03-20 17:19:51'),(2,5,'2023-03-20 17:19:52'),(2,6,'2023-03-20 17:19:52'),(1,1,'2023-03-22 17:22:34'),(1,25,'2023-03-22 17:22:38');
/*!40000 ALTER TABLE `user_meet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(50) DEFAULT NULL,
  `userId` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'Лесная мастерская','Уютная проектна мастерская для детей','2023-02-13 04:43:57','2023-03-22 22:40:32','/group_dd.jpeg',1),(2,'Детский лагерь','Уютный небольшой десткий центр для творчества','2023-02-13 04:43:57','2023-03-22 22:40:32','/group_lager.jpg',1),(3,'Творческий центр','Большое пространство для тренеровок и правктик','2023-02-13 04:43:57','2023-03-22 22:40:32','/group_tc.jpeg',1),(4,'Кухня','Мастера классы, изготовление ланчбоксов на неделю','2023-02-13 04:43:57','2023-03-22 22:40:32','/group_kuhna.jpg',1),(5,'Баня','Парение для людей','2023-02-13 04:43:57','2023-03-22 22:40:32','/group_bana.jpeg',1),(6,'1','1','2023-03-08 15:31:38','2023-03-22 22:40:32',NULL,1);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_place`
--

DROP TABLE IF EXISTS `user_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_place` (
  `placeId` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_place`
--

LOCK TABLES `user_place` WRITE;
/*!40000 ALTER TABLE `user_place` DISABLE KEYS */;
INSERT INTO `user_place` VALUES (2,8,'2023-03-10 21:39:02'),(2,14,'2023-03-10 22:28:20'),(2,15,'2023-03-10 22:46:49'),(2,16,'2023-03-11 10:24:17'),(1,1,'2023-03-21 23:00:19');
/*!40000 ALTER TABLE `user_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeId` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Светодиодные пеньки','Встречи друзей, игра на музыкальных инструментах, пение',1,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_pen.jpg'),(2,'Лего конструирование','Встречи друзей, игра на музыкальных инструментах, пение',1,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_lego.jpeg'),(3,'Рисование','Встречи друзей, игра на музыкальных инструментах, пение',2,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_picture.jpg'),(4,'Изготовление свечей','Встречи друзей, игра на музыкальных инструментах, пение',2,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_candle.jpg'),(5,'Тренеровка тела','Встречи друзей, игра на музыкальных инструментах, пение',3,'2023-02-13 04:43:57','2023-03-02 15:29:00','/group_tc.jpeg'),(6,'Актерское мастерство','Встречи друзей, игра на музыкальных инструментах, пение',3,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_action2.jpg'),(7,'Изготовление сладостей','Встречи друзей, игра на музыкальных инструментах, пение',4,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_cake.jpg'),(8,'Мужская баня','Встречи друзей, игра на музыкальных инструментах, пение',5,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_banam.jpg'),(9,'Женская баня','Встречи друзей, игра на музыкальных инструментах, пение',5,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_banaw.jpg'),(10,'Эпоксидная смола','Встречи друзей, игра на музыкальных инструментах, пение',1,'2023-02-13 04:43:57','2023-03-02 15:29:00','/project_epoxy.jpg'),(11,'новый проект3','описание нового проекта',1,'2023-02-27 16:05:44','2023-03-02 15:29:00','/group_dd.jpeg'),(12,'новый проект1','описание нового проекта1',1,'2023-02-27 16:11:23','2023-03-08 16:28:50','/group_dd.jpeg'),(13,'Новый проект без встреч','Слишком секретный проект чтобы его посещать',1,'2023-03-01 16:03:30','2023-03-02 15:29:00','/group_dd.jpeg'),(14,'Платформа Quantum','- образовательная платформа, проявляющая потенциал участника',1,'2023-03-07 14:38:34','2023-03-07 14:38:34',NULL),(15,'новый проект','описание нового проекта',1,'2023-03-09 09:53:28','2023-03-09 09:53:28',NULL),(16,'новый проект4','описание нового проекта4',2,'2023-03-09 10:00:13','2023-03-09 10:00:13',NULL),(17,'новый проект5','описание нового проекта5',3,'2023-03-09 10:06:36','2023-03-09 10:06:36',NULL);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_image`
--

DROP TABLE IF EXISTS `project_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_image` (
  `projectId` bigint NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
INSERT INTO `project_image` VALUES (1,'1cacc4a1-d2de-463b-bc5b-3e006c6a2d07.jpg','2023-03-22 15:03:55'),(1,'e675a6a5-175b-4dbd-8dc9-e9575daf0e15.jpg','2023-03-22 17:09:06'),(1,'40538d96-ff71-40eb-8457-42744ee53c95.jpg','2023-03-22 17:16:44'),(1,'2300cc40-5aa1-489a-837e-368e6792ceea.jpg','2023-03-22 17:17:21'),(1,'770e20c8-223d-4386-978d-9a6962e296bb.jpg','2023-03-22 17:20:07');
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_project` (
  `userId` bigint NOT NULL,
  `projectId` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES (2,1,'2023-02-24 23:22:35'),(3,2,'2023-02-24 23:22:35'),(5,2,'2023-02-24 23:22:35'),(2,3,'2023-02-24 23:22:35'),(5,3,'2023-02-24 23:22:35'),(2,4,'2023-02-24 23:22:35'),(3,4,'2023-02-24 23:22:35'),(5,4,'2023-02-24 23:22:35'),(3,5,'2023-02-24 23:22:35'),(4,5,'2023-02-24 23:22:35'),(2,6,'2023-02-24 23:22:35'),(1,6,'2023-03-02 02:00:06'),(1,3,'2023-03-10 22:53:15'),(15,3,'2023-03-10 23:18:22'),(16,4,'2023-03-11 10:25:07'),(16,3,'2023-03-11 11:12:16');
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `points` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `results` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,2,'Выбор темы замка2',25,'2023-02-13 04:43:57','2023-03-20 17:57:04','{\"emotion\":4}'),(2,2,'Список желаний',225,'2023-02-13 04:43:57','2023-03-20 17:57:04',NULL),(3,2,'Мое настроение сегодня',50,'2023-02-13 04:43:57','2023-03-20 17:57:04',NULL),(4,2,'Подготовка дерева',10,'2023-02-13 04:43:57','2023-03-20 17:57:04',NULL),(5,2,'Геометрические фигуры',100,'2023-02-13 04:43:57','2023-03-20 17:57:04',NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unique`
--

DROP TABLE IF EXISTS `unique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unique` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `points` bigint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unique`
--

LOCK TABLES `unique` WRITE;
/*!40000 ALTER TABLE `unique` DISABLE KEYS */;
INSERT INTO `unique` VALUES (1,1,'Вдохновитель',53,'2023-02-13 04:43:57','2023-03-07 21:14:38'),(2,1,'Изобретатель',8,'2023-02-13 04:43:57','2023-03-07 21:14:39'),(3,1,'Математик',9,'2023-02-13 04:43:57','2023-03-07 20:37:45'),(4,2,'Изобретатель цветов',9,'2023-02-13 04:43:57','2023-03-08 21:24:04'),(5,3,'Исследователь форм',10,'2023-02-13 04:43:57','2023-03-08 21:24:04');
/*!40000 ALTER TABLE `unique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `points` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Дмитрий Галкин2','/user_1.jpg','2023-02-13 04:43:57','2023-03-22 17:23:34','dima2','dima2',70),(2,'Анастасия Галкина','/user_3.jpg','2023-02-13 04:43:57','2023-03-06 18:17:30','nasta','nasta',0),(3,'Евгения Галкина','/user_2.jpg','2023-02-13 04:43:57','2023-03-06 18:17:30','eva','eva',0),(4,'Аня Якименко','/user_4.jpg','2023-02-13 04:43:57','2023-03-06 18:17:30','ana','ana',0),(5,'Аленка Иванова','/user_5.jpg','2023-02-13 04:43:57','2023-03-06 18:17:30','alena','alena',0),(6,'3',NULL,'2023-03-06 23:16:58','2023-03-06 23:16:58','3','3',0),(7,'123',NULL,'2023-03-10 17:46:28','2023-03-10 17:46:28','123','123',NULL),(8,'Дмитрий Галкин',NULL,'2023-03-10 19:01:19','2023-03-10 19:01:19','4757037@gmail.ru','123',NULL),(9,'Дмитрий Галкин',NULL,'2023-03-10 19:03:04','2023-03-10 19:03:04','4757037@gmail.ru','123',NULL),(10,'Дмитрий Галкин',NULL,'2023-03-10 21:43:33','2023-03-10 21:43:33','1','1',NULL),(11,'Дмитрий Галкин',NULL,'2023-03-10 21:48:58','2023-03-10 21:48:58','1','1',NULL),(12,'Дмитрий Галкин',NULL,'2023-03-10 21:49:22','2023-03-10 21:49:22','1','1',NULL),(13,'Дмитрий Галкин',NULL,'2023-03-10 22:25:29','2023-03-10 22:25:29','1','1',NULL),(14,'Дмитрий Галкин','{\"sex\":\"woman\",\"faceColor\":\"#AC6651\",\"earSize\":\"big\",\"eyeStyle\":\"oval\",\"noseStyle\":\"long\",\"mouthStyle\":\"smile\",\"shirtStyle\":\"short\",\"glassesStyle\":\"none\",\"hairColor\":\"#fff\",\"hairStyle\":\"womanLong\",\"hatStyle\":\"none\",\"hatColor\":\"#000\",\"eyeBrowStyle\":\"upWoman\",\"shirtColor\":\"#77311D\",\"bgColor\":\"#D2EFF3\"}','2023-03-10 22:26:00','2023-03-10 22:27:33','2','2',NULL),(15,'Дмитрий Галкин','{\"sex\":\"man\",\"faceColor\":\"#F9C9B6\",\"earSize\":\"small\",\"eyeStyle\":\"smile\",\"noseStyle\":\"round\",\"mouthStyle\":\"peace\",\"shirtStyle\":\"polo\",\"glassesStyle\":\"none\",\"hairColor\":\"#506AF4\",\"hairStyle\":\"thick\",\"hatStyle\":\"none\",\"hatColor\":\"#D2EFF3\",\"eyeBrowStyle\":\"up\",\"shirtColor\":\"#77311D\",\"bgColor\":\"#E0DDFF\"}','2023-03-10 22:45:28','2023-03-10 22:46:08','4','4',NULL),(16,'Аня Б.','{\"sex\":\"woman\",\"faceColor\":\"#AC6651\",\"earSize\":\"big\",\"eyeStyle\":\"smile\",\"noseStyle\":\"round\",\"mouthStyle\":\"peace\",\"shirtStyle\":\"polo\",\"glassesStyle\":\"none\",\"hairColor\":\"#F48150\",\"hairStyle\":\"womanShort\",\"hatStyle\":\"none\",\"hatColor\":\"#fff\",\"eyeBrowStyle\":\"upWoman\",\"shirtColor\":\"#9287FF\",\"bgColor\":\"#F4D150\"}','2023-03-11 10:04:30','2023-03-11 10:04:30','678','678',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_place`
--

DROP TABLE IF EXISTS `user_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_place` (
  `userId` bigint NOT NULL,
  `placeId` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_place`
--

LOCK TABLES `user_place` WRITE;
/*!40000 ALTER TABLE `user_place` DISABLE KEYS */;
INSERT INTO `user_place` VALUES (1,1,'2023-02-24 23:57:31'),(1,2,'2023-02-24 23:57:31'),(1,3,'2023-02-24 23:57:31'),(1,4,'2023-02-24 23:57:31'),(1,5,'2023-02-24 23:57:31');
/*!40000 ALTER TABLE `user_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'quantum'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-24  0:08:07

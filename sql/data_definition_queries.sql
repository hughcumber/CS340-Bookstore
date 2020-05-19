CREATE TABLE IF NOT EXISTS `Books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_name` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `num_pages` int(11) NULL,
  `genre` varchar(255) NULL,
  `edition` int(11) NOT NULL,
  `buyback_price` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`book_id`)
);


CREATE TABLE IF NOT EXISTS `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` float NOT NULL,
  PRIMARY KEY (`customer_id`)
);

CREATE TABLE IF NOT EXISTS `Orders` (
  `order_num` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `order_balance` float NOT NULL,
  PRIMARY KEY (`order_num`),
  FOREIGN KEY (`customer_id`) REFERENCES Customers(`customer_id`)
);


CREATE TABLE IF NOT EXISTS `Authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_name` varchar(225) NOT NULL,
   PRIMARY KEY (`author_id`)
);



CREATE TABLE IF NOT EXISTS `Books_Authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`author_id`) REFERENCES Authors(`author_id`),
   FOREIGN KEY (`book_id`) REFERENCES Books(`book_id`)
);

CREATE TABLE IF NOT EXISTS `Orders_Books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `order_num` int(11),
   PRIMARY KEY (`id`),
   FOREIGN KEY (`book_id`) REFERENCES Books(`book_id`),
   FOREIGN KEY (`order_num`) REFERENCES Orders(`order_num`)
);

INSERT INTO `Books`(`book_id`, `auth_name`, `book_name`, `num_pages`, `genre`, `edition`, `buyback_price`, `price`)
VALUES (1,"Taro Suzuki","Data Structure",500, "Programming", 2,25,70),
       (2,"Matthew MacDonald","Creating a web", 400, "Web", 3,20,60),
       (3,"JK Rowling","Harry Potter",800,"Novels",4,30,60);



INSERT INTO `Customers`(`customer_id`, `last_name`, `email`, `password`, `balance`)
VALUES (1, 'scott', 'scotthi@oregonstate.edu','testpassword1', 200.0),
		(2, 'saito', 'saito@oregonstate.edu', 'testpassword2', 100.0),
		(3, 'yamada', 'yamada2@oregonstate.edu', 'testpassword3', 50.0);


INSERT INTO `Orders`(`order_num`, `customer_id`, `order_balance`)
VALUES (1,1,20),
       (2,2,10),
       (3,1,50);

INSERT INTO `Authors`(`author_id`, `auth_name`)
VALUES (1, 'Taro Suzuki'),
       (2, 'Matthew MacDonald'),
       (3, 'JK Rowling'),
       (4, 'Tetsuo, Sato');

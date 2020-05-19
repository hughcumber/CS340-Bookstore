-- ***Search Page****
-- Search a book (Author and Edition are equired)
SELECT book_id, auth_name, book_name, edition FROM `Books` WHERE `book_name` LIKE :useBookNameInput AND `edition` = :useEditionInput
(--Example: SELECT book_id, auth_name, book_name, edition FROM `Books` WHERE `book_name` LIKE "data structure" AND `edition` = 2) 


--***Purchase page***
SELECT * FROM `Books` WHERE `book_name` LIKE :useBookNameInput AND `edition` = :useEditionInput
(--Example: SELECT *  FROM `Books` WHERE `book_name` LIKE "data structure" AND `edition` = 2) 

-- Add to order database

INSET INTO `Orders` (`order_num`, `email`, `order_balance`) VALUES (:updateOrderNum, :userInputEmail, :userInputPrice)  
(--Example: INSERT INTO `Orders`(`order_num`, `email`, `order_balance`) VALUES (4,'scotthi@oregonstate.edu', 20) )

 
---***Return Page ***



---***Delete Book page****




---***Account Page

INSERT INTO `Customers`(`customer_id`, `last_name`, `email`, `password`) 
VALUES (:custome_id_input,:last_name_input,email_input, password_input)

UPDATE `Customers` SET `last_name`= :last_name_input,`email`= :email_input_new WHERE :email_input_current

SELECT last_name, balance, email  FROM `Customers` WHERE :emailAddressInput





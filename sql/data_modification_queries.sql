-- Search Page
-- Allows a user to search for a book by entering bookname
-- Intentionally vague to give more related results

SELECT book_id, auth_name, book_name, edition FROM `Books` WHERE `book_name` = :bookInput

-- Purchase page
-- This ignores edition number and presents a list of books with the same name

SELECT *  FROM `Books` WHERE `book_name` = :bookInput

-- Add to order entity

INSERT INTO `Orders`(`order_num`, `customer_id`, `order_balance`),
VALUES (:orderInput, :idInput, :balanceInput);

-- Return Page
-- Removes an order from the orders entity
-- Eventually need to add refunding the customer

DELETE FROM 'Orders' WHERE 'order_num' = :numInput AND 'customer_id'

-- Delete Book page

DELETE FROM 'Books' WHERE 'book_name' = :bookInput

-- Account Page
-- Add Customer, update customer information, and display account information
INSERT INTO `Customers`(`customer_id`, `last_name`, `email`, `password`) 
VALUES (:customeridInput, :lastnameInput, :emailInput, :passwordInput)

UPDATE `Customers` SET `last_name`= :lastnameInput,`email`= :emailnewInput WHERE :emailcurrentInput

SELECT last_name, balance, email  FROM `Customers` WHERE :emailInput

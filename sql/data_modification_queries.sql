Search Page

//Search a book (Author and Edition are required)
SELECT book_id, auth_name, book_name, edition FROM `Books` WHERE `book_name` LIKE "data structure" AND `edition` = 2



Purchase page

SELECT *  FROM `Books` WHERE `book_name` LIKE "data structure" AND `edition` = 2

Add to order database

INSERT INTO `Orders`(`order_num`, `customer_id`, `order_balance`) VALUES (4,2,20)

Return Page



Delete Book page




Account Page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

  
    function getBooks(res, mysql, context, complete){
       mysql.pool.query("SELECT Books.book_id, book_name, num_pages, genre, edition, price, buyback_price from Books", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }



	function getBookWithOrders(res, mysql, context, complete){
        sql = "SELECT Books.book_id, book_name, edition, price, Orders_Books.order_num From Books INNER JOIN Orders_Books on Books.Book_id = Orders_Books.book_id"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.book_with_order = results
            complete();
        });
    }
  


  
    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT order_id, order_num, email, order_balance from Orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            complete();
        });
    }
	
	
	
	
	
	
	   router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js", "searchbook.js"];
        var mysql = req.app.get('mysql');
        getBooks(res, mysql, context, complete);
		getOrders(res, mysql, context, complete);
		getBookWithOrders (res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('orders_books', context);
            }

        }
    });
	

	    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders_Books (book_id, order_num, email) VALUES (?,?,?)";
		var sql2 = "INSERT INTO Orders (order_num, email) VALUES(?, ?)";
		var book = req.body.book_id
        var order = req.body.order_num
		var email = req.body.email
          var insert1 = [book, order, email];
		  var insert2 = [order, email];
           var first_sql = mysql.pool.query(sql, insert1, function(error, results, fields){
        if(error){
                res.write(JSON.stringify(error));
                        res.end();
        } else {
            var second_sql = mysql.pool.query(sql2, insert2, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
            });
            res.redirect('/orders_books');
        }
		
      });
});	
	

    return router;
}();

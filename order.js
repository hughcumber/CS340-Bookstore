module.exports = function(){
    var express = require('express');
    var router = express.Router();

  
	
    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT Orders.email, SUM(Books.price) as order_balance from Orders INNER JOIN Orders_Books on Orders_Books.order_num = Orders.order_num INNER JOIN Books on Orders_Books.book_id = Books.book_id GROUP BY Orders.email", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            complete();
        });
    }
	
	
	
    function getOrdersWithEmail(req, res, mysql, context, complete) {
       var query = "SELECT Orders.email, SUM(Books.price) as order_balance from Orders INNER JOIN Orders_Books on Orders_Books.order_num = Orders.order_num INNER JOIN Books on Orders_Books.book_id = Books.book_id WHERE Orders.email LIKE " + mysql.pool.escape(req.params.s + '%') + "GROUP BY Orders.email" ;
      console.log(query)
      mysql.pool.query(query, function(error, results, fields){
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
        context.jsscripts = ["searchorder.js"];
        var mysql = req.app.get('mysql');
		getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('order', context);
            }

        }
    });
	
	 router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchorder.js"];
        var mysql = req.app.get('mysql');
		getOrdersWithEmail(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('order', context);
            }
        }
    });
	

    return router;
}();

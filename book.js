module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBooks(res, mysql, context, complete){
       mysql.pool.query("SELECT Books.book_id as id, auth_name, book_name, num_pages, genre, edition, price, buyback_price from Books", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }

	
    function getBookWithTitle(req, res, mysql, context, complete) {
       var query = "SELECT Books.book_id as id, auth_name, book_name, num_pages, genre, edition, price, buyback_price from Books WHERE Books.book_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }



    function getBook(res, mysql, context, id, complete){
        var sql = "SELECT Books.book_id as id, auth_name, book_name, num_pages, genre, edition, price, buyback_price from Books WHERE book_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results[0];
            complete();
        });
    }	
	
   
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js", "searchbook.js"];
        var mysql = req.app.get('mysql');
        getBooks(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('book', context);
            }

        }
    });
	

	  router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js", "searchbook.js"];
        var mysql = req.app.get('mysql');
		getBookWithTitle(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('book', context);
            }
        }
    });
	
	
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatebook.js"];
        var mysql = req.app.get('mysql');
        getBook(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-book', context);
            }

        }
    });	
	
	

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Books (`auth_name`, `book_name`, `num_pages`, `genre`, `edition`, `price`, `buyback_price`) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.auth_name, req.body.book_name, req.body.num_pages, req.body.genre, req.body.edition, req.body.price, req.body.buyback_price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/book');
            }
        });
    });
	
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Books SET auth_name=?, book_name=?, num_pages=?, genre=?, edition=?, price=?, buyback_price=? WHERE book_id=?";
        var inserts = [req.body.auth_name, req.body.book_name, req.body.num_pages, req.body.genre, req.body.edition, req.body.price, req.body.buyback_price, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
	
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Books WHERE book_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })	
	
    return router;
}();

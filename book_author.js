module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //Get books
      function getBooks(res, mysql, context, complete){
       mysql.pool.query("SELECT Books.book_id as id, book_name, num_pages, genre, edition, price, buyback_price from Books", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }
	

    //Get authors 
    function getAuthos(res, mysql, context, complete){
        sql = "SELECT author_id, auth_name FROM Authors";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.author = results
            complete();
        });
    }

    
    function getBookWithAuthorName(res, mysql, context, complete){
        sql = "SELECT  Authors.auth_name as author, Books.book_id as id, Books.book_name as title, Books.Edition as edition, Books.Price as price FROM Books INNER JOIN Books_Authors on Books.book_id = Books_Authors.book_id INNER JOIN Authors on Authors.author_id = Books_Authors.author_id  GROUP BY Authors.auth_name"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.author_book = results
            complete();
        });
    }
  
  
     function getBookByAuthor(req, res, mysql, context, complete) {
       var query = "SELECT  Authors.auth_name as author, Books.book_id as id, Books.book_name as title, Books.Edition as edition, Books.Price as price FROM Books INNER JOIN Books_Authors on Books.book_id = Books_Authors.book_id INNER JOIN Authors on Authors.author_id = Books_Authors.author_id  WHERE Authors.auth_name LIKE " + mysql.pool.escape(req.params.s + '%') + "GROUP BY Authors.auth_name" ;
      console.log(query)
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.author_book = results;
            complete();
        });
    }

    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchbookbyauthor.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'book_author'
        getBooks(res, mysql, context, complete);
        getAuthos(res, mysql, context, complete);
        getBookWithAuthorName(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });
	

   	  router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchbookbyauthor.js"];
        var mysql = req.app.get('mysql');
		getBookByAuthor(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('book_author', context);
            }
        }
    });
	

    return router;
}();

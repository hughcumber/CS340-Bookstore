module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAccounts(res, mysql, context, complete){
       mysql.pool.query("SELECT Customers.customer_id as id, last_name, email, balance from Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.account = results;
            complete();
        });
    }

	/*
    function getAccountWithLastName(req, res, mysql, context, complete) {
       var query = "SELECT Customers.customer_id as id, last_name, email, balance from Customers  WHERE Customers.last_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.account = results;
            complete();
        });
    }

	*/
	
	function getAccountWithEmail(req, res, mysql, context, complete) {
       var query = "SELECT Customers.customer_id as id, last_name, email, balance from Customers  WHERE Customers.email LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.account = results;
            complete();
        });
    }
	
    function getAccount(res, mysql, context, id, complete){
        var sql = "SELECT customer_id as id, last_name, email, balance FROM Customers WHERE customer_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.account = results[0];
            complete();
        });
    }	
	
   
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteaccount.js", "searchaccount.js"];
        var mysql = req.app.get('mysql');
        getAccounts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('account', context);
            }

        }
    });
	

	  router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteaccount.js", "searchaccount.js"];
        var mysql = req.app.get('mysql');
		getAccountWithEmail(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('account', context);
            }
        }
    });
	
	
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateaccount.js"];
        var mysql = req.app.get('mysql');
        getAccount(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-account', context);
            }

        }
    });	
	
	
	   /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (last_name, email) VALUES (?,?)";
        var inserts = [req.body.last_name, req.body.email];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/account');
            }
        });
    });
	
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Customers SET last_name=?, email=? WHERE customer_id=?";
        var inserts = [req.body.last_name, req.body.email, req.params.id];
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
        var sql = "DELETE FROM Customers WHERE customer_id = ?";
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

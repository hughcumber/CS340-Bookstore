module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAccount(res, mysql, context, complete){
        mysql.pool.query("SELECT Customers.customer_id as id, last_name, email, balance from Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

	
	 /* Find people whose last name starts with a given string in the req */
    function getAccountWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT Customers.customer_id as id, last_name, email, balance from Customers  WHERE Customers.last_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
	
	
	
    /*Display all Account. */

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchaccount.js"];
        var mysql = req.app.get('mysql');
        getAccount(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('/account', context);
            }

        }
    });
    return router;
}();

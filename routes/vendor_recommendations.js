var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/vendors', function(req, res, next) {
   
   
    req.getConnection(function(err,conn){


        if (err){
        	//return next("Cannot Connect");
        	console.log("Cannot Connect");
        } 
        console.log(req.query.q);

        var sql = "select id,vendor_name from tbl_vendors where vendor_name LIKE '%"+req.query.q+"%' limit 10";
		/*var inserts = [req.query.q];
		sql = mysql.format(sql, inserts);*/
		console.log(sql);
        var query = conn.query(sql,function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(rows);
         //  res.render('index', { title: 'Express'  });
         res.json({"error" : false, "message" : "Success", "data" : rows, "count":rows.length});

         });

    });
});


router.get('/services', function(req, res, next) {
   
   
    req.getConnection(function(err,conn){


        if (err){
        	//return next("Cannot Connect");
        	console.log("Cannot Connect");
        } 
        console.log(req.query.vendor_id);
         console.log(req.query.category_id);

        var sql = "select * from tbl_products where vendor_id=? and category_id=? order by category_id;";
		var inserts = [req.query.vendor_id,req.query.category_id];
		sql = mysql.format(sql, inserts);
		console.log(sql);
        var query = conn.query(sql,function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(rows);
          // res.render('index', { title: 'Express'  });
          res.json({"error" : false, "message" : "Success", "data" : rows, "count":rows.length});

         });

    });
});



module.exports = router;
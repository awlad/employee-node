var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});

/* GET Employee listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource Employee');
    connection.connect(function (err){
        console.log('Connection with the officeball MySQL database openned...');
        if (err) return callback(new Error('Failed to connect'), null);
        // if no error, you can do things now.
        connection.query('SELECT * FROM employees',function(err,rows)     {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('employees/list', { page_title:"Employees | NodeJs", data:rows});

        });


    });


});

/* GET edit employee. */
router.get('/employees/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* PUT update listing. */
router.put('/employees/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* Post Create Employee */
router.post('/employees', function(req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;


exports.list = function(req, res){
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM customer',function(err,rows)     {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('customers',{page_title:"Customers - Node.js",data:rows});

        });

    });

};
exports.add = function(req, res){
    res.render('add_customer',{page_title:"Add Customers-Node.js"});
};
exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});

        });

    });
};
/*Save the customer*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone

        };

        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/customers');

        });

        // console.log(query.sql); get raw query

    });
};/*Save edited customer*/
exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone

        };

        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/customers');

        });

    });
};

exports.delete_customer = function(req,res){

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/customers');

        });

    });
};

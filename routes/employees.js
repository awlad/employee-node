var express = require('express');
var router = express.Router();

var connection = require('../db_connection.js');

/* GET Employee listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM employees',function(err, rows){
        if(err)
            console.log("Error Selecting : %s ",err );

        res.render('employees/list', { page_title:"Employees | NodeJs", data: rows});

    });

});

/* GET new employee. */
router.get('/new', function(req, res, next) {
    form_data = {
        page_title:"New Employees | NodeJs",
        action_path: '/employees',
        form_method: 'POST'
    };
    res.render('employees/new', form_data );

});


/* GET edit employee. */
router.get('/:id', function(req, res, next) {
    console.log(req.params);
    connection.query('SELECT * FROM employees where id = ?',[req.params.id], function(err, rows){
        if(err){
            console.log("Error Selecting : %s ", err );
            return;
        }
        form_data = {
            page_title:"Employees Edit " + rows[0].name + " | NodeJs",
            data: rows[0],
            action_path: '/employees/edit/'+rows[0].id,
            form_method: 'POST'
        };
        res.render('employees/edit', form_data );

    });

    //res.send('respond with a resource' + req.params.id);
});

/* PUT update listing. */
router.post('/edit/:id', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {

        name    : input.name,
        address : input.address,
        email   : input.email,
        position   : input.position

    };
    connection.query('UPDATE employees set ? where id = ?',[data, req.params.id], function(err, rows){
        if(err){
            console.log("Error Selecting : %s ",err );
            return;
        }
        res.redirect('/employees');

    });
});

/* Post Create Employee */
router.post('/', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {

        name    : input.name,
        address : input.address,
        email   : input.email,
        position   : input.position

    };
    connection.query('INSERT into employees set ?',data, function(err, rows){
        if(err){
            console.log("Error Selecting : %s ",err );
            return;
        }
        res.redirect('/employees');

    });
});

/* Post Create Employee */
router.get('/remove/:id', function(req, res, next) {
    connection.query("DELETE FROM employees  WHERE id = ? ",[req.params.id], function(err, rows)
    {

        if(err)
            console.log("Error deleting : %s ",err );

        res.redirect('/employees');

    });
});



module.exports = router;

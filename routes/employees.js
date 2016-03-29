
exports.list = function(req, res){
    req.getConnection(function(err, connection){

        connection.query('SELECT * FROM employees',function(err, rows)     {

            if(err) {
                console.log("Error Selecting : %s ", err );
            }

            res.render('employees/list', { page_title: "Employees", data: rows });

        });

    });

};

exports.add = function(req, res){
    res.render('employees/add', { page_title:"New Employee" });
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM employees WHERE id = ?',[id],function(err, row)
        {

            if(err) {

                console.log("Error Selecting : %s ",err );
            }

            res.render('employees/edit',{ page_title:"Edit Employee", data:row });

        });

    });
};

exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            name     : input.name,
            address  : input.address,
            email    : input.email,
            position : input.position

        };

        var query = connection.query("INSERT INTO employees set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/employees');

        });

        // console.log(query.sql); get raw query

    });
};

exports.update = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone

        };

        connection.query("UPDATE employees set ? WHERE id = ? ",[data,id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/employees');

        });

    });
};

exports.delete = function(req,res){

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM employees  WHERE id = ? ",[id], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/customers');

        });

    });
};
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting to db: ' + err.stack);
        return;
    }});

module.exports = connection;

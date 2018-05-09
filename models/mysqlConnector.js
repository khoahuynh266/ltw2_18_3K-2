// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'lovekieutrinh97',
    database : 'showbiz',
    debug    :  false
});
module.exports = pool;
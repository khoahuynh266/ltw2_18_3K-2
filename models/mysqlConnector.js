// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     :  'db4free.net'.
    user     : 'huynhkhoa',
    password : '123123123',
    database : 'showbiz266',
    debug    :  false
});
module.exports = pool;
// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9228811',
    password : '1CiQDPBCGB'
    database : 'sql9228811',
    debug    :  false
});
module.exports = pool;
// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'sql211.epizy.com',
    user     : 'epiz_21816598',
    password : 'lovekieutrinh97'
    database : 'epiz_21816598_tuan05',
    debug    :  false
});
module.exports = pool;
var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from celebrities", callback);
}

exports.create = function(celebrity, callback){
    db.executeQuery("INSERT INTO `celebrities` SET ?", celebrity, callback);
}
exports.findOne = function (celebrityId,callback) {
    db.executeQuery("SELECT * FROM `celebrities` WHERE id = ?",celebrityId, callback);
}
exports.delete = function (celebrityId,callback) {
    db.executeQuery("DELETE FROM `celebrities` WHERE id = ? ",celebrityId, callback);
}
exports.update = function (celebrity,callback) {
    db.executeQuery("UPDATE `celebrities` SET ? WHERE `id` =?;",[celebrity,celebrity.id], callback);
}

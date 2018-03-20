var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from celebrities", callback);
}

exports.create = function(celebrity, callback){
    db.executeQuery("INSERT INTO `showbiz`.`celebrities` SET ?", celebrity, callback);
}
exports.findOne = function (celebrityId,callback) {
    db.executeQuery("SELECT * FROM `showbiz`.`celebrities` WHERE id = ?",celebrityId, callback);
}
exports.delete = function (celebrityId,callback) {
    db.executeQuery("DELETE FROM `showbiz`.`celebrities` where id = ? ",celebrityId, callback);
}
exports.update = function (celebrity,callback) {
    db.executeQuery("UPDATE `showbiz`.`celebrities` SET ? WHERE `id` =?;",[celebrity,celebrity.id], callback);
}

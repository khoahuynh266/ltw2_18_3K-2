var celebritiesModel = require('../models/celebrities');
var cm = require('../models/celebrities');
exports.create = function (req, res) {
    // Create and Save a new celebrity
    celebritiesModel.create(req.body, function (err,data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).send();
    })
};

exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    celebritiesModel.findAll(function (err, data) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send(data);
        }
    );
};


exports.findOne = function(req, res) {
    // Find a single celebrities with a celebrityId
    celebritiesModel.findOne(req.params.celebrityId, function(err, data) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "celebrities not found with id " + req.params.celebrityId});
            }

            if(!data) {
                return res.status(404).send({message: "celebrities not found with id " + req.params.celebrityId});
            }

        }
        res.send(data);
    });
};

exports.update = function(req, res) {
    // Update a celebrities identified by the celebrityId in the request

    var updates = req.body;
    updates.id = req.params.celebrityId;
    celebritiesModel.update(updates, function (err, data) {
        if (err) {
            res.status(500).send({message: "Could not update celebrities with id " + req.params.celebrityId});
        } else {
            res.send(data);
        }
    });
}


exports.delete = function(req, res) {
    // Delete a celebrities with the specified celebrityId in the request
    celebritiesModel.delete(req.params.celebrityId, function (err, data) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({message: "celebrities not found with id " + req.params.celebrityId});
            }
            return res.status(500).send({message: "Could not delete celebrities with id " + req.params.celebrityId});
        }

        if (!data) {
            return res.status(404).send({message: "celebrities not found with id " + req.params.celebrityId});
        }
        res.send({message: "Note deleted successfully!"});
    });
}

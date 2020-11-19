const MetaConfig = require("../models/metaconfig.model");

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    console.log("req.params" + req.params.source)
    MetaConfig.findById(req.params.source, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Config with id ${req.params.source}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Config with id " + req.params.source
                });
            }
        } else res.send(data);
    });
};


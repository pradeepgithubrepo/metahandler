const Config = require("../models/config.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  console.log("log")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Config
  const config = new Config({
    source: req.body.source,
    metamap: req.body.metamap,
  });

  // Save Config in the database
  Config.create(config, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Config.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  console.log("req.params" + req.params.source)
  Config.findById(req.params.source, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.source}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.source
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Config
  const config = new Config({
    source: req.body.source,
    metamap: req.body.metamap,
  });
  Config.updateById(config, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while Updating the Config."
      });
    else res.send(data);
  });

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Config.remove(req.params.source, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ConfigMap with id ${req.params.source}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ConfigMap with id " + req.params.source
        });
      }
    } else res.send({ message: `ConfigMap was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};

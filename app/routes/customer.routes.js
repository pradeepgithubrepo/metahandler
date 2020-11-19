module.exports = app => {
  const configs = require("../controllers/customer.controller.js");
  const metaconfigs = require("../controllers/metaconfig.controller.js");

  // Create a new Config
  app.post("/postconfigmap", configs.create);

  // Retrieve all Config
  app.get("/getconfigmap", configs.findAll);

  // Retrieve a single Config with sourceID
  app.get("/getsingleconfig/:source", configs.findOne);

  // Update a Config 
  app.post("/updateConfigmap", configs.update);


  // Retrieve a single Metaconfig with sourceID
  app.get("/getmetadata/:source", metaconfigs.findOne);

  // // Delete a Customer with customerId
  app.delete("/delconfigmap/:source", configs.delete);

  // // Create a new Customer
  // app.delete("/customers", configs.deleteAll);
};

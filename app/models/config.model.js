const sql = require("./db.js");

// constructor
const Configuration = function (config) {
  this.source = config.source;
  this.metamap = config.metamap;
};

Configuration.create = (newConfig, result) => {
  sql.query("INSERT INTO configmap (source, metamap) VALUES ($1, $2)", [newConfig.source, newConfig.metamap], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created config: ", { id: res.insertId, ...newConfig });
    result(null, { id: res.insertId, ...newConfig });
  });
};

Configuration.findById = (source, result) => {
  console.log("Prinitn source" + source);
  sql.query(`SELECT * FROM configmap WHERE source = '${source}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    let resresult = res['rows']
    console.log("REsults" + JSON.stringify(resresult));
    if (result.length) {
      console.log("found Config: ", resresult[0]);
      result(null, resresult[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Configuration.getAll = result => {
  sql.query("SELECT source FROM configmap", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Config: ", res);
    result(null, res);
  });
};

Configuration.updateById = (config, result) => {
  console.log("Coming here")
  sql.query(
    "UPDATE configmap SET metamap = $1 WHERE source = $2",
    [config.metamap, config.source],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Config: ", { config });
      result(null, { config });
    }
  );
};

Configuration.remove = (source, result) => {
  sql.query("DELETE FROM configmap WHERE source = $1", [source], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted configmap with id: ", source);
    result(null, res);
  });
};

Configuration.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Configuration;

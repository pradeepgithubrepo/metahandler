const sql = require("./db.js");


const MetaConfiguration = function (config) {
    this.source = config.source;
    this.metadata = config.metadata;
};

MetaConfiguration.findById = (source, result) => {
    sql.query(`SELECT * FROM metaconfig WHERE source = 'default' OR source = '${source}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let resresult = res['rows']
        console.log("REsults" + JSON.stringify(resresult));
        if (result.length) {
            console.log("found Config: ", resresult);
            result(null, resresult);
            return;
        }

        result({ kind: "not_found" }, null);
    });

};

// Configuration.getAll = result => {
//     sql.query("SELECT source FROM configmap", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("Config: ", res);
//         result(null, res);
//     });
// };

// Configuration.updateById = (config, result) => {
//     console.log("Coming here")
//     sql.query(
//         "UPDATE configmap SET metamap = ? WHERE source = ?",
//         [config.metamap, config.source],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Customer with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated Config: ", { config });
//             result(null, { config });
//         }
//     );
// };

// Configuration.remove = (id, result) => {
//     sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             // not found Customer with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         console.log("deleted customer with id: ", id);
//         result(null, res);
//     });
// };

// Configuration.removeAll = result => {
//     sql.query("DELETE FROM customers", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} customers`);
//         result(null, res);
//     });
// };

module.exports = MetaConfiguration;

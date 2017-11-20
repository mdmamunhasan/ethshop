var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
});

connection.connect();

module.exports = {
    all: function (params, callback) {
        var sql = "SELECT * FROM sales";
        if (params.search) {
            sql += " WHERE order_id = " + params.search + " OR customer_id = '" + params.search + "' ";
        }
        connection.query(sql, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results});
        });
    },

    save: function (data, callback) {
        connection.query('INSERT INTO sales SET ?', data, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: {id: results.insertId}});
        });
    },

    get: function (id, callback) {
        connection.query('SELECT * FROM sales WHERE id = ?', id, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results[0]});
        });
    },

    delete: function (id, callback) {
        connection.query('DELETE FROM sales WHERE id = ?', id, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results});
        })
    }
}
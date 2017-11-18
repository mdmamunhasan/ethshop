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
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results});
        });
    },

    save: function (data, callback) {
        if (data.id) {
            var id = data.id;
            delete data['id'];
            connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function (error, results, fields) {
                if (error) {
                    return callback({status: 0, data: error});
                }
                return callback({status: 1, data: results});
            });
        }
        else {
            connection.query('INSERT INTO products SET ?', data, function (error, results, fields) {
                if (error) {
                    return callback({status: 0, data: error});
                }
                return callback({status: 1, data: {id: results.insertId}});
            });
        }
    },

    get: function (id, callback) {
        connection.query('SELECT * FROM products WHERE id = ?', id, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results[0]});
        });
    },

    delete: function (id, callback) {
        connection.query('DELETE FROM products WHERE id = ?', id, function (error, results, fields) {
            if (error) {
                return callback({status: 0, data: error});
            }
            return callback({status: 1, data: results});
        })
    }
}
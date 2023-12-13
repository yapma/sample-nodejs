const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yapma1373@',
    database: 'node_task_db'
});

const getAllCategories = (callback) => {
    const query = 'SELECT * FROM tbl_categories';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving category: ', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    getAllCategories
}
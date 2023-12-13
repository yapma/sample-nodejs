const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yapma1373@',
  database: 'node_task_db'
});

const createUser = (user) => {
  const { firstName, lastName, email, password } = user;
  const query = `INSERT INTO tbl_users (FirstName, LastName, Email, Password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error creating user: ', err);
      return;
    }
    console.log('User created successfully');
  });
};

const login = (email, callback) => {
  const query = `SELECT * FROM tbl_users WHERE Email = '${email}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving user: ', err);
      callback(err, null);
      return;
    }
    callback(null, result[0]);
  });
}

const getAllUsers = (callback) => {
  const query = 'SELECT * FROM tbl_users';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving user: ', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  createUser,
  getAllUsers,
  login
}
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yapma1373@',
    database: 'node_task_db'
});

const createPostCard = (postCard) => {
    const { name, description, category } = postCard;
    const query = `INSERT INTO tbl_postCard (Name, Description, Category) VALUES ('${name}', '${description}', '${category}')`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error creating postCard: ', err);
            return;
        }
        console.log('PostCard created successfully');
    });
};

const getAllPostCards = (callback) => {
    const query = 'SELECT * FROM tbl_postCard';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving postCard: ', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const updatePostCardById = (id, updatedPostCard) => {
    const { name, description, category } = updatedPostCard;
    const query = `UPDATE tbl_postCard SET Name = '${name}', Description = '${description}', Category = '${category}' WHERE Id = '${id}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error updating postCard: ', err);
            return;
        }
        console.log('PostCard updated successfully');
    });
};

const deletePostCardById = (id) => {
    const query = `DELETE FROM tbl_postCard WHERE Id = '${id}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting postCrad: ', err);
            return;
        }
        console.log('PostCard deleted successfully');
    });
};

module.exports = {
    createPostCard,
    getAllPostCards,
    updatePostCardById,
    deletePostCardById
}
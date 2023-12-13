const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yapma1373@',
    database: 'node_task_db'
});

const createPostCard = (postCard) => {
    const { name, description, category } = postCard;
    const query1 = `INSERT INTO tbl_categories (Title) values ('${category.title}');`
    db.query(query1 , (err, result) => {
        if (err) {
            console.error('Error creating postCard: ', err);
            return;
        }

        const query2 = `INSERT INTO tbl_postCards (Name, Description, CategoryId) VALUES ('${name}', '${description}', '${result.insertId}');`;
        db.query(query2 , (err, result) => {
            if (err) {
                console.error('Error creating postCard: ', err);
                return;
            }
            console.log('PostCard created successfully');
        });
    });
};

const getAllPostCards = (callback) => {
    const query = 'SELECT * FROM tbl_postCards INNER JOIN tbl_categories ON tbl_postCards.categoryId = tbl_categories.Id';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving postCard: ', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const getPostCardById = (id, callback) => {
    const query = `SELECT * FROM tbl_postCards INNER JOIN tbl_categories ON tbl_postCards.categoryId = tbl_categories.Id WHERE tbl_postCards.Id = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving postCard: ', err);
            callback(err, null);
            return;
        }
        callback(null, result[0]);
    });
}

const updatePostCardById = (id, updatedPostCard) => {
    const { name, description, category } = updatedPostCard;
    const query = `UPDATE tbl_postCards SET Name = '${name}', Description = '${description}' WHERE Id = '${id}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error updating postCard: ', err);
            return;
        }
        console.log('PostCard updated successfully');
    });
};

const deletePostCardById = (id) => {
    const query = `DELETE FROM tbl_postCards WHERE Id = '${id}'`;
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
    getPostCardById,
    updatePostCardById,
    deletePostCardById
}
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postCardsRoutes = require('./routes/postCards');
const categoryRoutes = require('./routes/category');

const app = express();

app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.use('/api/post/crud', postCardsRoutes);
app.use('/api/category', categoryRoutes);

const swagger = require('./swagger')
swagger(app)

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

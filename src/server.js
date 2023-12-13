const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postCardsRoutes = require('./routes/postCards');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/postcards', postCardsRoutes);

const swagger = require('./swagger')
swagger(app)

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

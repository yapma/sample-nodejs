const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const swagger = require('./swagger')
swagger(app)

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

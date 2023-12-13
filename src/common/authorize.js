const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            // Verify the token
            const tekenWithOutBearer = token.replace("Bearer ", "")
            const decoded = jwt.verify(tekenWithOutBearer, 'secret');

            // Add the decoded username to the request object
            req.userId = decoded.UserId;
            req.userEmail = decoded.userEmail;

            // Call the next middleware
            next();
        } catch (error) {
            // Return an error message if the token is invalid
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        // Return an error message if the token is missing
        res.status(401).json({ error: 'Token missing' });
    }
};

module.exports = {
    authorize
};
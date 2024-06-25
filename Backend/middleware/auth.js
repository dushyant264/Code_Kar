const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports= auth
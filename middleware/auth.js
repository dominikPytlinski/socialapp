const jwt = require('jsonwebtoken');
const { returnErrors, setErrors } = require('../helpers/errors');

exports.isLogged = (req, res, next) => {
        try {
            const auth = req.headers.authorization;
            if(!auth) setErrors(401,'Unauthorized');
            const token = auth.split(' ')[1];
            if(!token) setErrors(401, 'Unauthorized');
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.role = decoded.role;
            req.userId = decoded.userId;
            next();
        } catch (error) {
            if(error.name == 'TokenExpiredError') {
                return res.status(401).json({
                    error: 'Unauthorized'
                });
            } else {
                returnErrors(error, res);
            }
        }
    }
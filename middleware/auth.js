const jwt = require('jsonwebtoken');
const { setErrors } = require('../helpers/setErrors');

exports.isLogged = (req, res, next) => {
        const auth = req.headers.authorization;
        if(!auth) {
            const e = new Error('Unauthorized');
            e.name = 'CustomError';
            e.code = 401;
            throw e;
        }
        const token = auth.split(' ')[1];
        if(!token) {
            const e = new Error('Unauthorized');
            e.name = 'CustomError';
            e.code = 401;
            throw e;
        }
        try {
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
                setErrors(error, res);
            }
        }
    }
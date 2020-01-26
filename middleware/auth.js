const jwt = require('jsonwebtoken');

exports.isLogged = (req, res, next) => {
        const auth = req.headers.authorization;
        if(!auth) return res.status(401).json({
            level: 'Error',
            message: 'Unauthorized'
        });
        const token = auth.split(' ')[1];
        if(!token) return res.status(401).json({
            level: 'Error',
            message: 'Unauthorized'
        });
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.role = decoded.role;
            req.userId = decoded.userId;
            next();
        } catch (error) {
            if(error.name == 'TokenExpiredError') return res.status(401).json({
                level: 'Error',
                message: 'Unauthorized'
            });
        }
    }
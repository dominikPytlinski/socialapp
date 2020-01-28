exports.returnErrors = (error, res) => {
    if(error.name == 'CustomError') {
        return res.status(error.code).json({
            error: error.message
        });
    } else {
        console.log(error);
        return res.status(500).json(error)
    }
}

exports.setErrors = (code, message) => {
    const error = new Error(message);
    error.name = 'CustomError';
    error.code = code;
    throw error;
}
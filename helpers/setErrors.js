exports.setErrors = (error, res) => {
    if(error.name == 'CustomError') {
        return res.status(error.kind).json({
            error: error.message
        });
    } else {
        console.log(error);
        return res.status(500).json(error)
    }
}
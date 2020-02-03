const express = require('express');
const mongosse = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config();

const { isLogged } = require('./middleware/auth');

const app = express();

const PORT = process.env.PORT || 4000;

let filename;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') cb(new Error('incorret type'), false);
        else cb(null, true);
    }
 });

//Rutes
const usersRouts = require('./routes/usersRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const loginRoutes = require('./routes/loginRoutes');
const postsRoutes = require('./routes/postsRoutes');

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRouts);
app.use('/roles', rolesRoutes);
app.use('/login', loginRoutes);
app.use('/posts', postsRoutes);
app.use('/upload', isLogged, upload.single('img'), (req, res, next) => {
    return res.status(200).json({
        path: `http://localhost:4000/uploads/${filename}`
    });
});

app.use('/uploads', express.static('uploads'));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kszkn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const mongoOption = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongosse.connect(uri, mongoOption)
    .then(
        app.listen(PORT, () => {
            console.log(`Server stated on port ${PORT}`);
        })
    ).catch(err => console.log(err));

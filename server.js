const express = require('express');
const mongosse = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

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

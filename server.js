const express = require('express');
const mongosse = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

const usersRouts = require('./routes/usersRoutes');
const rolesRoutes = require('./routes/rolesRoutes');

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRouts);
app.use('/roles', rolesRoutes);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kszkn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const mongoOption = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
mongosse.connect(uri, mongoOption)
    .then(
        app.listen(PORT, () => {
            console.log(`Server stated on port ${PORT}`);
        })
    ).catch(err => console.log(err));

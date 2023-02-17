const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const v1Router = require('./routes/index');
const cors = require('cors');

//app config
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

//Middleware
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(express.json());

//DB config
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('connected to DB');

//api middleware
app.get('/', function (req, res) {
    res.send('server up and running');
});
app.use('/v1', v1Router);

//listener
app.listen(port, () => console.log(`Server is up and running on  ${port}`));
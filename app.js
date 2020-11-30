const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const uri = "mongodb+srv://dinosaciragic:jebogadan@smartsales.jmmcs.mongodb.net/test?retryWrites=true&w=majority"; //might have to change test
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MangoDB Connected..'))
    .catch(err => console.log(err))

// Bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
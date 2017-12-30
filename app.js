const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect to database
mongoose.connect(config.database); // creating a config file and 
// On connection on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public'))); // we can call it client as well

// Body Parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

// Start Server
app.listen(port, () => {
    console.log('Server starting on port '+port);
});
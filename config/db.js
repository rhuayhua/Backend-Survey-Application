let URI = require('./config').ATLASDB;

// Database setup 
let mongoose = require('mongoose');


module.exports = function() {
    // Connect to the database
    mongoose.connect(URI);

    let mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDB.once('open', ()=>{
    console.log('Connected to MongoDB ...');
    })

    return mongoDB;

}


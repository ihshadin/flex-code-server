const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const flexHandler = require('./routeHandler/flexHandler')

// Middleware
app.use(cors());
app.use(express.json());

const dburi = `mongodb+srv://${process.env.FLEXCODE_USERNAME}:${process.env.FLEXCODE_PASSWORD}@cluster0.f5zl9xv.mongodb.net/flexCodeDB?retryWrites=true&w=majority`

const databaseConnect = async () => {
    try {
       setTimeout(function(){
        mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
       }, 6000)
        console.log('Database connection successful');
    } catch (error) {
        console.log(error.message);
        console.log('Database connection failed');
    }
}

// application routes
app.use('/testimonial', flexHandler);

app.get('/', (req, res) => {
    res.send('FlexCode. Unlock your code knowledge');
    databaseConnect()
})
app.listen(port, (req, res) => {
    console.log('FlexCode are runnin on: ', port);
})


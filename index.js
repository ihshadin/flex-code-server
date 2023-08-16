const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// Routes function
const flexHandler = require('./routeHandler/flexHandler')
const blogHandler = require('./routeHandler/blogHandler')
const userHandler = require('./routeHandler/userHandler')
const feedbackHandler = require('./routeHandler/feedbackHandler')

// Middleware
app.use(cors());
app.use(express.json());

const dburi = `mongodb+srv://${process.env.FLEXCODE_USERNAME}:${process.env.FLEXCODE_PASSWORD}@cluster0.f5zl9xv.mongodb.net/flexCodeDB?retryWrites=true&w=majority`

const databaseConnect = async () => {
    try {
        await mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connection successful');
    } catch (error) {
        console.log(error.message);
        console.log('Database connection faild');
    }
}

// application routes
app.use('/problems', flexHandler);
app.use('/blog', blogHandler);
app.use('/users', userHandler);
app.use('/feedback', feedbackHandler);

app.get('/', (req, res) => {
    res.send('FlexCode. Unlock your code knowledge');
    databaseConnect()
})
app.listen(port, (req, res) => {
    console.log('FlexCode are runnin on: ', port);
})


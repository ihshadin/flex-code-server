const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
            // serverSelectionTimeoutMS: 30000,

        })

        app.post('/jwt', (req, res) => {
            const user = req.body;
            console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            console.log(token);
            res.send({ token });
        })

        console.log('Database connection successful');
    } catch (error) {
        console.log(error.message);
        console.log('Database connection failed');
    }
}

// application routes
app.use('/problems', flexHandler);
app.use('/blog', blogHandler);
app.use('/users', userHandler);
app.use('/feedback', feedbackHandler);

databaseConnect()
app.get('/', (req, res) => {
    res.send('FlexCode. Unlock your code knowledge');
})
app.listen(port, (req, res) => {
    console.log('FlexCode are runnin on: ', port);
})


// module.exports = verifyJWT;
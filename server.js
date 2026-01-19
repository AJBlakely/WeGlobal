const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});
//
const User = require('../WeGlobal/models/user');

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));

app.use(morgan('dev'));



//          ROUTES

//    HOME
app.get('/', (req, res)=>{
    res.render('home.ejs')
});
//funnels request with /auth through authController
app.use('/auth', authController)

//    NEW
app.get('/itinerary/new', (req, res)=> {
    res.render('trips/new.ejs')
});

//   INDEX
app.get('/trips', (req, res)=>{
    res.render('trips/index.ejs')
});

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`)
});



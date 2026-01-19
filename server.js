const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/isSignedIn')
const passUserToView = require('./middleware/passUserToView')
const authController = require('./controllers/auth');
const tripsController = require('./controllers/trips')


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});
//
const User = require('../WeGlobal/models/user');

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passUserToView);

app.use(morgan('dev'));


//          ROUTES

//    HOME
app.get('/', (req, res)=>{
  if(req.session.user){
    res.redirect(`/users/${req.session.user._id}/trips`)
  }
     else{
    res.render('home.ejs')
}
    });


          //funnels request with /auth through authController
app.use('/auth', authController)
app.use(isSignedIn)    
app.use('/users/:userId/trips', tripsController)


    /*
//   INDEX
app.get('/trips', (req, res)=>{
    res.render('trips/index.ejs')
});

//    NEW
app.get('/itinerary/new', async (req, res)=> {
    res.render('trips/new.ejs')
});
*/

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`)
});



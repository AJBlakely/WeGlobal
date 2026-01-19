const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');


router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
});

router.get('/sign-in', (req, res)=>{
    res.render('auth/sign-in.ejs')
});

//create sign out load here

router.post('/sign-up', async (req, res)=> {
    try {
        //check for username
        const userInDatabase = await User.findOne({username: req.body.username})
        if (userInDatabase) {
            return res.send('Username already taken. Please choose another!');
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.send("Passowrds must match!");
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

// create user
        await User.create(req.body);

        res.redirect('/auth/sign-in')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.post('/sign-in', async (req, res) => {
    try{
        //find user
        const userInDatabase = await User.findOne({username: req.body.username});
if (!userInDatabase){
    return res.send('Login Failed. Please try again!')
}

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if(!validPassword){
        return res.send('Login failed. Please try again!')

    }
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    }
console.log("BODY:", req.body); console.log("USER:", userInDatabase);
    res.redirect('/')
}catch (error) {
        console.log(error)
        res.redirect('/')

    }
})




module.exports = router
const mongoose = require('mongoose');


//each trip
const itinerarySchema = mongoose.Schema({
    destination: {type: String, required: true},
    accommodation: [{type: String}],
    startDate: {type: Date},
    endDate: {type: Date},
    event1: {time: String, activity: String, link: String },
    event2: {time: String, activity: String, link: String },
    event3: {time: String, activity: String, link: String },
    event4: {time: String, activity: String, link: String },
    event5: {time: String, activity: String, link: String },
    tips: {type: String},
});

//each user
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    trips: [itinerarySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
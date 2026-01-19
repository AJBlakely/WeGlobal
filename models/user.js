const mongoose = require('mongoose');


//for each added event
const timeSlotSchema = new mongoose.Schema({
    time: {type: String, required: true},
    event: {type: String, required: true},
    link: {type: String}   
});

//each date
const travelDateSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    timeSlots: [timeSlotSchema]   
});

//each trip
const itinerarySchema = mongoose.Schema({
    destination: {type: String, required: true},
    accommodation: [{type: String, required: true}],
    recommendedLinks: [{type:String}],
    travelDates: [travelDateSchema],
    tips: {type: String},
    startDate: {type: Date},
    endDate: {type: Date}
});

//each user
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    trips: [itinerarySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
// modules 
const mongoose = require('mongoose');

// Place schema define
const HotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

})

const Hotel = module.exports = mongoose.model('Hotel', HotelSchema);

// add new hotel
module.exports.newHotel = function (hotel, callback) {
    hotel.save(callback)
}

// all hotels
module.exports.allHotels =  function (callback) {
    Hotel.find(callback)
}

// delete hotel
module.exports.deleteHotel = function(id, callback) {
    Hotel.findByIdAndDelete(id, callback)
}
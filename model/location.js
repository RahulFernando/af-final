// modules 
const mongoose = require('mongoose');

// Place schema define
const LocationSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Location = module.exports = mongoose.model('Location', LocationSchema);

// creating new location
module.exports.newLocation = function (location, callback) {
    location.save(callback)
};

// get all locations
module.exports.getAllLocations = function (callback) {
    Location.find(callback);
}

// get location by id
module.exports.getLocationById = function(id, callback) {
    Location.findById(id, callback)
}

// update location
module.exports.updateLocation = function (id,location, callback) {
    Location.findByIdAndUpdate(id, location, callback);
}

// delete location by id
module.exports.deleteLocation = function (id, callback) {
    Location.findByIdAndDelete(id, callback)
}
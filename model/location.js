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
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'
    }
})

const Location = module.exports = mongoose.model('Location', LocationSchema);

// creating new location
module.exports.newLocation = function (location, callback) {
    location.save(callback)
};

// get all locations
module.exports.getAllLocations = function (callback) {
    Location.find().populate('hotel').exec(callback)
}

// get location by id
module.exports.getLocationById = function(id, callback) {
    Location.findById(id).populate('hotel').exec(callback)
}

// update location
module.exports.updateLocation = function (id,location, callback) {
    Location.findByIdAndUpdate(id, location, callback);
}

// delete location by id
module.exports.deleteLocation = function (id, callback) {
    Location.findByIdAndDelete(id, callback)
}

// get location by name
module.exports.getLocationByName = function (name, callback) {
    const query = {
        name: name
    };
    Location.findOne(query, callback);
}
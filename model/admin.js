// modules 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin schema define
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

// add admin
module.exports.newAdmin = function (admin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) throw err;
            admin.password = hash;
            admin.save(callback);
        })
    })
}

// compare password
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}

// find admin by its username
module.exports.getAdminByUsername = function (username, callback) {
    const query = {
        username: username
    };
    Admin.findOne(query, callback);
};
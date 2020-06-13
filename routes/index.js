// modules
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// admin model
const Admin = require('../model/admin')

// routes
router.get('/', (req, res) => {
    return res.send('AF FINAL')
})

// new admin
router.post('/register', (req, res) => {
    let admin = Admin ({
        username: req.body.username,
        password: req.body.password
    })
    Admin.newAdmin(admin, (err, admin) => {
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken ";
            if (err.errors.email) message += "Email already exists";
            return res.json({
                success: false,
                message
            })
        } else {
            return res.json({
                status: 200,
                message: 'New admin registered'
            })
        }
    })
})

// admin login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admin.getAdminByUsername(username, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            return res.json({
                status: 400,
                message: "Invalid username"
            })
        }
 
        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                 const token = jwt.sign({
                     type: "admin",
                     data: {
                         _id: admin._id,
                         username: admin.username,
                         email: admin.email
                     }
                 }, "tourism", {
                         expiresIn: 5000 // for 5 min
                     }
                 );
                return res.json({
                    status: 200,
                    type: 'admin',
                    token: 'Bearer '+token
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid Password"
                })
            }
        })
    })
});

module.exports = router;
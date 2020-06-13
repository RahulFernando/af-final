// modules
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

// models
const Admin = require('../model/admin');
const Location = require('../model/location')
const Hotel = require('../model/hotel')

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
    Admin.newAdmin(admin, (err, admin) => { // declared in admin model
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
    Admin.getAdminByUsername(username, (err, admin) => { // declared in admin model
        if (err) throw err;
        if (!admin) {
            return res.json({
                status: 400,
                message: "Invalid username"
            })
        }
 
        Admin.comparePassword(password, admin.password, (err, isMatch) => { // declared in admin model
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

// saving images to local
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({storage: storage}).single("file")

// adding places 
router.post('/location', async (req, res) => {
    try {
        await upload(req, res, err => {
            if (err) return res.json({success: false, err})
            const location = new Location()
            location.image.data = fs.readFileSync(req.file.path)
            location.image.contentType = "image/png"
            location.name = req.body.name
            location.description = req.body.description
            location.hotel = req.body.hotel

            Location.newLocation(location, err => {
                if(err) { console.log(err) }
                return res.status(200).json({success: true})
            })
        })
    } catch (error) {
        
    }
})

// get locations 
router.get('/locations', (req, res) => {
    Location.getAllLocations((err, locations) => {
        if(!err) {
            return res.send(locations)
        } else {
            console.log(err)
        }
    })
})

router.get('/location/:id', async(req,res) => {
    console.log("hello")
    try {
        await Location.getLocationById(req.params.id, (err, location) => {
            if (!err) {
                return res.send(location)
            } else {
                console.log(err)
            }
        })
    } catch (error) {
        
    }
})

// update locations
router.put('/location/:id', async (req, res) => {
    try {
        const location = {name: req.body.name, description: req.body.description, hotel: req.body.hotel}
        Location.updateLocation(req.params.id, location, (err) => {
            if(!err) {
                res.json(({message: 'Updated'}))
            }
        })
    } catch (error) {
        
    }
})

router.delete('/location/:id', (req, res) => {
    Location.deleteLocation(req.params.id, err => {
        if (!err) {
            return res.json({message: 'Deleted!'})
        }
    })
})

router.post('/search', (req, res) => {
    console.log(req.body.name)
    Location.getLocationByName(req.body.name, (err, location) => {
        if (!err) {
            return res.send(location)
        }
    })
})

router.post('/hotel', (req, res) => {
    const hotel = new Hotel()
    hotel.name = req.body.name
    Hotel.newHotel(hotel, (err) => {
        if (!err) {
            return res.json({message: 'Uploaded!'})
        }
    })
})

router.get('/hotel', (req, res) => {
    Hotel.allHotels((err, hotels) => {
        if (!err) {
            return res.send(hotels)
        }
    })
})

router.delete('/hotel/:id', (req, res) => {
    Location.find({
        hotel: req.params.id
    }, function(err, match) {
        if (match.length > 0 ) {
            console.log(match)
            return res.json({
                message: 'You have added this hotel to a location'
            })
        } else {
            Hotel.deleteHotel(req.params.id, err => {
                if (!err) {
                    return res.json({message: "Deleted!"})
                }
            })
        }
    })
})

module.exports = router;
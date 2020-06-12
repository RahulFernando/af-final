// modules
const express = require('express')
const router = express.Router()

// routes
router.get('/', (req, res) => {
    return res.send('AF FINAL')
})

module.exports = router;
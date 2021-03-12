const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', require('../../middleware/protect'), (req, res) => {
    res.send('Private File');
})

module.exports = router;
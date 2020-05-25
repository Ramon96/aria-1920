const express = require('express'); // Express web server framework
const router = express.Router();

// const request = require('request'); // "Request" library

router.get('/player*', function (req, res){
    console.log('AccesToken:', req.session.accessToken)
    res.render('spotify/player');
})







module.exports = router;
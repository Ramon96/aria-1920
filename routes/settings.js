var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/settings', function(req, res) {
    res.render('settings', { title: 'Aria settings'});
});



module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (user) {
    res.render('index', { title: 'Dander' });
  } else {
    res.render('index', { title: 'Dander'})
  }
});

module.exports = router;

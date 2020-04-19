var express = require('express');
var router = express.Router();
var config = require('./../config')

/* GET home page. */
router.get('/yhdemo', function(req, res, next) {
  console.log('跳转到demo.hbs页面')
  res.render('pages/demo', {
    // layout:false,
    title: config.project.project_title,
  });
});

module.exports = router;

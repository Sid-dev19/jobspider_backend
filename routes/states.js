var express = require ('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.get('/fetch_all_states', function (req, res, next) {

  try {
    pool.query('select * from state', function (error, result) {
      if (error) {

        res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Category Successfully Submitted', data: result })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }
});

router.post('/fetch_all_citys', function (req, res, next) {

  try {
    pool.query('select * from city where stateid=?', [req.body.stateid], function (error, result) {
      if (error) {

        res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Success', data: result })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }
});






module.exports = router;
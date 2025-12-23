var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');  
var verifyToken=require("./authMiddleware")  

// Submit Apply Details Route
router.post('/submit_applydetails', upload.single('icon'), function (req, res, next) {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: 'Resume file is required.'
            });
        }

        // Database Query
        pool.query(
            "INSERT INTO applydetails (fullname, dob, gender,mobileno,email, resume,jobid) VALUES (?, ?, ?, ?,?, ?,?)",
            [
                req.body.fullname, 
                req.body.dob, 
                req.body.gender, 
                req.body.mobileno,
                req.body.email, 
                req.file.filename ,
                 req.body.jobid
                
            ],
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        status: false,
                        message: 'Database error. Please contact the DBA.'
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        message: 'Apply details submitted successfully.'
                    });
                }
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            message: 'There is a technical issue. Please contact the server administrator.'
        });
    }
});




router.get('/display_all_apply',verifyToken, function(req, res,next) {
    try{
  
      pool.query("select * from applydetails",function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'Success',data:result})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });



  
router.get('/fetch_all_detail', function(req, res,next) {
    try{
  
      pool.query("select * from applydetails",function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'Success',data:result})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });







module.exports = router;

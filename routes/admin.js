var express= require('express')
var pool=require('./pool')
var upload=require('./multer')
var router = express.Router();
const  jwt= require("jsonwebtoken")
const dotenv =require('dotenv')
dotenv.config();

 router.post('/check_password',function(req,res,next){
    console.log(req.body)
 pool.query("select * from jobspider_admin where (emailid=? or mobileno=? ) and password=?",
    [req.body.emailid,req.body.emailid,req.body.password],
    function(error,result){
    if(error){
        console.log(error);
        
        res.status(500).json({status:false, message:"databse error please contact with DBA"})
     }
     else{
      if(result.length == 1){
         var secretKey = process.env.JWT_SECRET_KEY
            var token = jwt.sign ({ user: result[0] },secretKey, {
                expiresIn:'1h',
               
            });
            console.log(token)
        
          res.status(200).json({ token,status: true,data:result[0],message:"Sucess"})
         } else
        res.status(200).json({status:false,data:[], message:'Invalid Emailid/Mobileno/Password....'})
    }
    
} 
 );
     
 });

 

 module.exports =router;


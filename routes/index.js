var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;





// var express = require('express');
// var router = express.Router();
// var upload = require('./multer');
// var pool = require('./pool');


// router.post("/fetch_all_skills", function (req, res, next) {
//   try {
//     pool.query('select * from requiredskills where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: "database error...." });
//       } else {

//         res.status(200).json({ status: true, message: " Suceess.", data: result });
//       }
//     }
//     );
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(200).json({
//       status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
//     });
//   }
// }
// );

// router.get('/fetch_all_city', function (req, res, next) {
//   pool.query('select * from city', function (error, result) {
//     if (error) {
//       res.status(500).json({ status: false, message: 'database error please contact with database adminstrator' })
//     }
//     else {
//       res.status(200).json({ data: result, status: true, mesage: 'sucess' });
//     }


//   });
// });


// router.post("/submit_jobs", function (req, res, next) {
//   try {
//     pool.query('insert into company_jobs(companyid, categoryid, subcategoryid, skills, Educationqualification, experience, jobdetails, jobtype, minSalary, maxSalary, schedule, benefits, worklocationcity, supplymentalpay, postdate, applicationdeadline, expectedstart, applicationquestion, contactperson, emailaddress, mobileno) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
//       [req.body.companyid,
//       req.body.categoryid,
//       req.body.subcategoryid,
//       req.body.skills,
//       req.body.educationqualification,
//       req.body.Experience,
//       req.body.jobdetails,
//       req.body.jobtype,
//       req.body.minsalary,
//       req.body.maxsalary,
//       req.body.schedule,
//       req.body.benefits,
//       req.body.worklocationcity,
//       req.body.supplymentalpay,
//       req.body.postdate,
//       req.body.applicationdeadline,
//       req.body.expectedstart,
//       req.body.applicationquestion,
//       req.body.contactperson,
//       req.body.emailaddress,
//       req.body.mobileno],




//       function (error, result) {
//         if (error) {
//           console.error(error);
//           res.status(500).json({ status: false, message: "database error...." });
//         } else {
//           console.log(req.body)
//           res.status(200).json({ status: true, message: " Company Jobs successfully...", data: result });
//         }
//       }
//     );
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(200).json({
//       status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
//     });
//   }
// }
// );



// router.get('/fetch_all_jobs', function (req, res, next) {
//   pool.query("select j.*, (select c.categoryname from category c where c.categoryid = j.categoryid) as categoryname,(select s.subcategoryname from subcategory s where s.subcategoryid= j.subcategoryid)as subcategoryname from company_jobs j", function (error, result) {
//     if (error) {
//       console.log(error);
      
//       res.status(500).json({ status: false, message: 'database error please contact with database adminstrator' })
//     }
//     else {
//       res.status(200).json({ data: result, status: true, message: 'sucess' });
//     }



  

//   });
// });

// router.post('/edit_companyjobs', function (req, res, next) {
//   try {
    
//     pool.query("update company_jobs set companyid=? ,categoryid=?, subcategoryid=?, skills=?, Educationqualification=?, Experience=?, jobdetails=?, jobtype=?, minsalary=?, maxsalary=?, schedule=?, benefits=?, worklocationcity=?, supplymentalpay=?, postdate=?, applicationdeadline=?, expectedstart=?, applicationquestion=?, contactperson=?, emailaddress=?, mobileno=?" 
      
//       [req.body.companyid,
//         req.body.categoryid,
//         req.body.subcategoryid,
//         req.body.skills,
//         req.body.educationqualification,
//         req.body.Experience,
//         req.body.jobdetails,
//         req.body.jobtype,
//         req.body.minsalary,
//         req.body.maxsalary,
//         req.body.schedule,
//         req.body.benefits,
//         req.body.worklocationcity,
//         req.body.supplymentalpay,
//         req.body.postdate,
//         req.body.applicationdeadline,
//         req.body.expectedstart,
//         req.body.applicationquestion,
//         req.body.contactperson,
//         req.body.emailaddress,
//         req.body.mobileno],
      
//       function (error, result) {
//       if (error) {
//         console.log( req.body)
//         res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
//       }
//       else {

//         res.status(200).json({ status: true, message: 'required Company jobs  updated Successfully' })
//       }
//     })
//   }
//   catch (e) {
//     res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
//   }

// });






// router.post('/delete_companyjobs',  function (req, res, next) {
//   try {
//       pool.query(" delete from company_jobs where jobid=?", [req.body.jobid], function (error, result) {
//           if (error) {
//               console.log(error)
//               res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
//           }
//           else {
//               res.status(200).json({ status: true, message: ' skill data Deleted Successfully' })
//           }
//       })
//   }
//   catch (e) {
//       res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
//   }

// });







// module.exports = router;


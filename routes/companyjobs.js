var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

/* GET home page. */
router.post('/submit_companyjobs', function (req, res, next) {
    try {
        // Ensure `skills` is a valid integer or NULL
        // const skills = Number.isInteger(Number(req.body.skills)) 
        //     ? Number(req.body.skills) 
        //     : null;

        pool.query(
            `INSERT INTO company_jobs 
            (companyid, categoryid, subcategoryid, skills, Educationqualification,benifits, Experience, jobdeatails, jobtype, minsalary, maxsalary, schedule, worklocationcity, supplementalpay, postdate, applicationdeadline, expectedstart, applicationquestion, contactperson, emailaddress, mobileno)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.body.companyid, req.body.categoryid, req.body.subcategoryid, req.body.skills, req.body.Educationqualification, req.body.benifits,
                req.body.Experience, req.body.jobdeatails, req.body.jobtype, req.body.minsalary, req.body.maxsalary, req.body.schedule,
                req.body.worklocationcity, req.body.supplementalpay, req.body.postdate,
                req.body.applicationdeadline, req.body.expectedstart, req.body.applicationquestion, req.body.contactperson,
                req.body.emailaddress, req.body.mobileno
            ],
            function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: false, message: 'Database Error... Please Contact with DBA...' });
                } else {
                    res.status(200).json({ status: true, message: 'Required skills information submitted successfully' ,data:result});
                }
            }
        );
    } catch (e) {
        res.status(500).json({ status: false, message: 'There is a Technical issue... Please contact the server Administrator...' });
    }
});



router.get('/fetch_all_category', function (req, res, next) {
    pool.query('select * from category', function (error, result) {

        if (error) {
            console.log("error")
            res.status(500).json({ status: false, message: 'database error:pls contacr with database administartor' });
        }

        else {
            console.log("success")
            res.status(200).json({ data: result, status: true, message: 'success' });
        }

    });

});

router.post('/fetch_all_subcategory', function (req, res, next) {

    pool.query('select * from subcategory where categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            console.log("error")
            res.status(500).json({ status: false, message: 'database error:pls contacr with database administartor' });
        }

        else {
            console.log("success")
            res.status(200).json({ data: result, status: true, message: 'success' });
        }

    });

});


// Add this route to your existing routes file
router.post('/fetch_skills_by_subcategory', function (req, res, next) {
    console.log("start")
    pool.query('select * from requiredskills where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
       
        if (error) {
            console.log("error")
            res.status(500).json({ status: false, message: 'database error:pls contact with database administrator' });
        } else {
            console.log("success")
            res.status(200).json({ data: result, status: true, message: 'success' });
        }
    });
});



router.get('/fetch_all_city', function (req, res, next) {
    pool.query('select * from city', function (error, result) {

        if (error) {
            console.log("error")
            res.status(500).json({ status: false, message: 'database error:pls contacr with database administartor' });
        }

        else {
            console.log("success")
            res.status(200).json({ data: result, status: true, message: 'success' });
        }

    });

});







router.get('/display_all', function (req, res, next) {
    try {
        pool.query("select C.*,(select CA.categoryname from category CA where CA.categoryid=C.categoryid) as categoryname, (select SC.subcategoryname from subcategory SC where SC.subcategoryid=C.subcategoryid) as subcategoryname from company_jobs C", function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Success', data: result })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});

router.post('/edit_companyjobs_data', function (req, res, next) {
    console.log(req.body);
    
    try {
        pool.query(`update company_jobs set companyid=?, categoryid=?, subcategoryid=?, skills=?, Educationqualification =?,benifits=?, Experience=?, jobdeatails=?, jobtype=?, minsalary=?, maxsalary=?, schedule=?, worklocationcity=?, supplementalpay=?, postdate=?, applicationdeadline=?, expectedstart=?, applicationquestion=?, contactperson=?, emailaddress=?, mobileno=? where jobid=?`,
             [req.body.companyid, req.body.categoryid, req.body.subcategoryid, req.body.skills, req.body.Educationqualification, req.body.benifits,
            req.body.Experience, req.body.jobdeatails, req.body.jobtype, req.body.minsalary, req.body.maxsalary, req.body.schedule,
            req.body.worklocationcity, req.body.supplementalpay, req.body.postdate,
            req.body.applicationdeadline, req.body.expectedstart, req.body.applicationquestion, req.body.contactperson,
            req.body.emailaddress, req.body.mobileno, req.body.jobid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {

                res.status(200).json({ status: true, message: 'required Skill  updated Successfully' , data: result})
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});


module.exports = router;

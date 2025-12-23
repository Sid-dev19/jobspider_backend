var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.get('/user_top_company_display', function (req, res, next) {

  try {
    pool.query("select C.*,(select S.statename from state S where S.stateid=C.stateid) as statename, (select CC.cityname from city CC where CC.cityid=C.cityid) as cityname from companies C limit 7", function (error, result) {
      if (error) {


        res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Sucess', data: result })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }
});


router.get('/trending_jobs', function (req, res, next) {

  try {
    pool.query("select company_jobs.jobtype,jobtype.picture, dense_rank() over(order by count(company_jobs.jobtype) desc) as trending from company_jobs,jobtype where company_jobs.jobtype=jobtype.jobtype  group by company_jobs.jobtype limit 5",
      function (error, result) {
        // pool.query("select company_jobs.jobtype,jobtype.picture,dense_rank() over (order by count (company_jobs.jobtype) desc) as trending from company_jobs JOIN  jobtype on company_jobs.jobtype = jobtype.jobtype group by company_jobs.jobtype, jobtype.picture  limit 5", function (error, result) {
        if (error) {


          res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
        }
        else {
          res.status(200).json({ status: true, message: 'Sucess', data: result })
        }
      })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }

});


router.post('/main_search_jobs', (req, res) => {
  try {
    // console.log("aaaa", req.body)

    // Time filter
    let tq = '';
    if (req.body.time == 24) {
      tq = "AND DATEDIFF(CURDATE(), postdate) <= 1";
    } else if (req.body.time == 3) {
      tq = "AND DATEDIFF(CURDATE(), postdate) <= 3";
    } else if (req.body.time == 7) {
      tq = "AND DATEDIFF(CURDATE(), postdate) <= 7";
    }

    // Job type filter
    let jobTypeCondition = '';
    if (req.body.jobtypes && req.body.jobtypes.length > 0) {
      const jobtypes = req.body.jobtypes.map(type => `'${type}'`).join(",");
      jobTypeCondition = `AND C.jobtype IN (${jobtypes})`;
    }

    // Work shift filter 
    let workShiftCondition = '';
    if (req.body.workShiftList && req.body.workShiftList.length > 0) {
      const shifts = req.body.workShiftList.map(shift => `'${shift}'`).join(",");
      workShiftCondition = `AND C.schedule IN (${shifts})`;
    }

    // Sort condition
    let sortQuery = '';
    if (req.body.sortOption === 'salary') {
      sortQuery = 'ORDER BY C.maxsalary DESC';
    } else if (req.body.sortOption === 'date') {
      sortQuery = 'ORDER BY C.postdate DESC';
    }

    // Education filter
    let educationCondition = '';
    if (Array.isArray(req.body.education) && req.body.education.length > 0) {
      const educationMap = {
        '10th': ['High School'],
        '12th': ['Higher Secondery School'],
        'Graduation': ['BSC', 'BTECH', 'Betech', 'BCOM', 'BA', 'BBA'],
        'Post Graduation': ['MBA', 'MCA', 'PGDM'],
      };

      let allowedValues = [];
      req.body.education.forEach(label => {
        if (educationMap[label]) {
          allowedValues.push(...educationMap[label]);
        }
      });

      if (allowedValues.length > 0) {
        const values = allowedValues.map(v => `'${v}'`).join(',');
        educationCondition = `AND EXISTS (
          SELECT 1 FROM JSON_TABLE(C.Educationqualification, '$[*]' 
            COLUMNS(title VARCHAR(255) PATH '$.title')
          ) AS edu
          WHERE edu.title IN (${values})
        )`;
      }
    }





    // Main query
    const q = `
      SELECT C.*, CM.*, CT.*, SCT.*, 
          (SELECT cityname FROM city WHERE cityid = CM.cityid) AS cityname, 
          (SELECT statename FROM state WHERE stateid = CM.stateid) AS statename 
      FROM company_jobs C, companies CM, category CT, subcategory SCT 
      WHERE 
        C.categoryid = ${req.body.categoryid} AND 
        C.subcategoryid = ${req.body.subcategoryid} AND 
        locate('${req.body.cityname}',worklocationcity) OR
        C.companyid = CM.companyid AND 
        C.categoryid = CT.categoryid AND 
        C.subcategoryid = SCT.subcategoryid AND 
        (
          ${req.body.expr} BETWEEN 
            SUBSTRING_INDEX(C.Experience, '-', 1) + 0 AND 
            SUBSTRING(C.Experience, LOCATE('-', C.Experience) + 1) + 0 
          OR (C.minsalary >= 0 AND C.maxsalary <= ${req.body.sal})
        )
        ${jobTypeCondition}
        ${workShiftCondition}
        ${educationCondition}
        ${tq}
        ${sortQuery}
    `;
    console.log(q)
    pool.query(q, function (error, result) {
      if (error) {
        //  console.log("City Data: ", req.body.cityid, req.body.cityname)
        console.log("DB Error:", error);
        res.status(500).json({ status: false, message: 'Database Error... Please Contact DBA.' });
      } else {
        console.log(result)
        res.status(200).json({ status: true, message: 'Success', data: result });
      }
    });

  } catch (e) {
    console.error("Catch Block Error:", e);
    res.status(200).json({ status: false, message: 'Technical issue... Please contact server Administrator.' });
  }
});



router.post('/select_all_skills', function (req, res, next) {

  try {
    //console.log("aaaa", req.body)


    var q = ` SELECT C.*, CM.*, CT.*, SCT.*,(SELECT cityname FROM city WHERE cityid = CM.cityid) AS cityname,(SELECT statename FROM state WHERE stateid = CM.stateid) AS statename FROM company_jobs C JOIN companies CM ON C.companyid = CM.companyid JOIN category CT ON C.categoryid = CT.categoryid JOIN subcategory SCT ON C.subcategoryid = SCT.subcategoryid WHERE C.categoryid = ${req.body.categoryid} AND C.subcategoryid = ${req.body.subcategoryid} AND C.jobid != ${req.body.jobid}   `


 
    //console.log(req.body)
    //console.log(q)
    pool.query(q, function (error, result) {
      if (error) {
        //console.log(error)
        res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Sucess', data: result })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }
});


router.get('/fetch_all_skills', (req, res) => {
  pool.query("SELECT * FROM requiredskills", (error, result) => {
    if (error) {
      console.error("DB ERROR 👉", error); // 👈 ADD THIS
      return res.status(500).json({
        status: false,
        message: error.message // 👈 SEE REAL ERROR
      });
    }

    res.status(200).json({
      status: true,
      message: "Success",
      data: result
    });
  });
});



router.get('/fetch_all_city', function (req, res) {

  pool.query(
    "SELECT cityid, cityname FROM city",
    function (error, result) {

      if (error) {
        console.error('DB ERROR fetch_all_city:', error); // 🔴 VERY IMPORTANT
        return res.status(500).json({
          status: false,
          message: 'Database error'
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success',
        data: result
      });
    }
  );

});



















router.post('/check_account', function (req, res, next) {
console.log(req.body)
  try {
    pool.query("select * from users where  emailaddress=? or mobileno=?", [req.body.emailMobile, req.body.emailMobile], function (error, result) {

      if (error) {

  console.log("bbbb:",error)
        res.status(200).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        if (result.length == 1)
          res.status(200).json({ status: true, message: 'Sucess', data: result[0] })
        else
          res.status(200).json({ status: false, message: 'Sucess', data: [] })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }

});



router.post('/insert_record', function (req, res, next) {
  console.log(req.body)
  try {
    pool.query("insert into users values(?,?,?,?)", [req.body.mobileno, req.body.emailaddress, req.body.password,req.body.username],
      function (error, result) {
        if (error) {

          res.status(200).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
        }
        else {

          res.status(200).json({ status: true, message: 'Success', data: [] })

        }
      })
  }
  catch (e) {

    res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
  }

});







router.post('/check_password', function (req, res, next) {
  console.log("aaaaaaaaaaaaaaaaaaa", req.body)
  try {
    pool.query("select * from users where (emailaddress=? or mobileno=?) and password=?", [req.body.emailMobile, req.body.emailMobile, req.body.password], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database Error....pls Contact DBA...' })
      }
      else {
        if (result.length == 1) {
           console.log(result[0])
          return res.status(200).json({ status: true, message: 'Sucess', data: result[0] })
        }
        else
          // console.log(error)
          return res.status(200).json({ status: false, message: 'Sucess', data: [] })
      }
    })
  }

  catch (e) {
    res.status(200).json({ status: false, message: 'there is technical issue...pls contact server Admistrator' })
  }

});















module.exports = router;





var express = require('express');
var router = express.Router();
var pool = require('./pool');
var verifyToken=require("./authMiddleware")

router.get("/show_all_category", function (req, res, next) {
  try {
    pool.query('SELECT * FROM category', function (error, result) {
      if (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Please contact the DBA administrator" });
      } else {
        res.status(200).json({ status: true, message: "Category fetched successfully", data: result });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(200).json({ status: false, message: "Technical issue, please contact the server administrator" });
  }
});

router.post("/show_all_subcategory", function (req, res, next) {
  console.log(req.body)
  try {
    pool.query('select * from subcategory where categoryid=?', [req.body.categoryid], function (error, result) {
      if (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "database error...." });
      } else {
        res.status(200).json({ status: true, message: "success...", data: result });
      }
    }
    );
  } catch (e) {
    console.error("Error:", e);
    res.status(200).json({
      status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
    });
  }
}
);

router.post('/submit_skills', function (req, res, next) {
  try {
    console.log("BODY:", req.body)
    pool.query("insert into requiredskills (skillid,categoryid,subcategoryid,skills) values(?,?,?,?)", [req.body.skillid, req.body.categoryid, req.body.subcategoryid, req.body.skills], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ status: false, message: 'Database Error..Pls Contact DBA...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Category Submitted Successfully' })
      }

    })

  }
  catch (e) {
    console.log("Error:", e)
    res.status(200).json({ status: false, message: 'There is technical issue..Pls Contact Server Admistrator...' })
  }
});

router.get("/display_all_skills",verifyToken, function (req, res, next) {
  try {
    pool.query('SELECT R.*,(select C.categoryname from category C where  C.categoryid= R.categoryid) as categoryname ,(select SC.subcategoryname from subcategory SC where SC.subcategoryid= R.subcategoryid)as subcategoryname from requiredskills R', function (error, result) {
      if (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Please contact the DBA administrator" });
      } else {
        res.status(200).json({ status: true, message: "Category fetched successfully", data: result });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(200).json({ status: false, message: "Technical issue, please contact the server administrator" });
  }
});
router.post('/edit_requiredskills_data', function (req, res, next) {
  try {
    
    pool.query("update requiredskills set  categoryid=?, subcategoryid=?,skills=?  where skillid=?", [req.body.categoryid, req.body.subcategoryid, req.body.skills, req.body.skillid], function (error, result) {
      if (error) {
        console.log( req.body.skills)
        res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
      }
      else {

        res.status(200).json({ status: true, message: 'required Skill  updated Successfully' })
      }
    })
  }
  catch (e) {
    res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
  }

});
router.post('/delete_skill',  function (req, res, next) {
  try {
      pool.query(" delete from requiredskills where skillid =?", [req.body.skillid], function (error, result) {
          if (error) {
              console.log(error)
              res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
          }
          else {
              res.status(200).json({ status: true, message: ' skill data Deleted Successfully' })
          }
      })
  }
  catch (e) {
      res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
  }

});





module.exports = router;




var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
var verifyToken=require("./authMiddleware")
router.post(
  "/submit_subcategory",upload.single("icon"),function (req, res, next) {
    try {
      pool.query(
        "insert into subcategory ( subcategoryid,categoryid,subcategoryname,subcategorypicture) values(?,?,?,?)",
        [req.body.subcategoryid,req.body.categoryid,req.body.subcategoryname, req.file.filename],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: "database error...." });
          } else {
            res.status(200).json({ status: true, message: "database submitted...." });
          }
        }
      );
    } catch (e) {
      console.log("Error:", e);
      res.status(200).json({status: false,message: "There is technical issue..Pls Contact Server Admistrator...",
      });
    }
  }
);

router.post(
  "/edit_subcategory_data",function (req, res, next) {
    try {
      pool.query("update subcategory set subcategoryname=? where subcategoryid=?",
        [req.body.subcategoryname, req.body.subcategoryid],function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "database error...." });
          } else {
            res.status(200).json({ status: true, message: "Category Name Updated Success...." });
          }
        }
      );
    } catch (e) {
      console.log("Error:", e);
      res.status(200).json({ status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
      });
    }
  }
);

router.post(
  "/edit_subcategory_picture",upload.single("icon"),function (req, res, next) {
    try {
      pool.query( "update subcategory set subcategorypicture=? where subcategoryid=?",
        [req.file.filename, req.body.subcategoryid],function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "database error...." });
          } else {
            res.status(200).json({ status: true, message: "SubCategory picture Updated Success...." });
          }
        }
      );
    } catch (e) {
      console.log("Error:", e);
      res.status(200).json({status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
      });
    }
  }
);
router.post("/delete_subcategory", function (req, res, next) {
    try {
      pool.query(
      "delete  from subcategory  where subcategoryid=?",
        [ req.body.subcategoryid],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "database error...." });
          } else {
            res.status(200).json({ status: true, message: "SubCategory Delete Updated Success...." });
          }
        }
      );
    } catch (e) {
      console.log("Error:", e);
      res.status(200).json({status: false,message: "There is technical issue..Pls Contact Server Admistrator...",
      });
    }
  }
);

router.get("/display_all",verifyToken,function (req, res, next) {
    try {
      pool.query(
        "select S.*, (select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S ",
       
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: "database error...." });
          } else {
            res.status(200).json({ status: true, message: "success...",data:result });
          }
        }
      );
    } catch (e) {
      console.log("Error:", e);
      res.status(200).json({status: false, message: "There is technical issue..Pls Contact Server Admistrator...",
      });
    }
  }
);
module.exports = router;
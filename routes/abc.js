 
    router.get('/show_all_category', async function (req, res) {
        console.log('Request received for /show_all_category');
        try {
          pool.query('SELECT * FROM category', function (error, results) {
            if (error) {
              console.error('Database query error:', error);
              return res.status(500).json({
                status: false,
                message: 'Database error.',
              });
            }
            console.log('Query successful:', results);
            res.status(200).json({
              status: true,
              message: 'Categories fetched successfully.',
              data: results,
            });
          });
        } catch (err) {
          console.error('Technical issue:', err);
          res.status(500).json({
            status: false,
            message: 'Technical issue, please contact the administrator.',
          });
        }
      });
      


    
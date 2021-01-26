const {pool} = require("./queries");

exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM receptionist ORDER BY email ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
      response.status(200).json(results.rows)
    })
}

exports.loginUser= (req, res) => {
    console.log(req.body);  
    if (req.body.usertype == 'manager'){
        var qr = 'SELECT * FROM manager WHERE email = $1 AND password = $2';
    }
    else{
        var qr = 'SELECT * FROM receptionist WHERE email = $1 AND password = $2';
    }
    pool.query(qr, [req.body.username,req.body.password], (error, results) => {
        if (error) {
          throw error
        }
        // console.log(results);
        if(results && results.rows && results.rows.length>0){
            res.status(200).json({token: '123', username: req.body.username,  usertype: req.body.usertype})
        }
        else{
            res.status(401).json({message: "invalid info"});
        }
      })
};

exports.managerInfo = (req, res) => {
  if (req.body.employeeType == 'salesperson'){
    var qr = 'SELECT * FROM salesperson WHERE city = $1 ORDER BY name ASC';
  }
  else{
      var qr = 'SELECT * FROM receptionist WHERE city = $1 ORDER BY name ASC';
  }
  console.log(req.body);

  pool.query(qr, [req.body.city], (error, results) => {
    if (error) {
      throw error
    }
    if(results && results.rows && results.rows.length>0){
        res.status(200).json(results.rows)
        console.log(results.rows);
    }
    else{
        res.status(401).json({message: "invalid info"});
    }

  })

};

  
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
    pool.query('SELECT * FROM receptionist WHERE email = $1 AND password = $2', [req.body.username,req.body.password], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results);
        if(results && results.rows && results.rows.length>0){
            res.status(200).json({token: '123', username: req.body.username})
        }
        else{
            res.status(401).json({message: "invalid info"});
        }
      })
    // res.send({
    //     token: 'test123'
    // });
};

  
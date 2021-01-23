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
    res.send({
        token: 'test123'
    });
};

  
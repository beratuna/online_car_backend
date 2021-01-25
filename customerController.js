const {pool} = require("./queries");

exports.getTrackId = (req, res) => {
    console.log(req.body);
    pool.query('SELECT * FROM car WHERE trackid = $1', [req.body.trackId], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results);
        if(results && results.rows && results.rows.length>0){
            res.status(200).json(results.rows)
        }
        else{
            res.status(401).json({message: "invalid info"});
        }
      })
    };

exports.saveServiceRequest = (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO customer (email, name, surname, phone, city) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING', [req.body.email, req.body.name, req.body.surname ,req.body.phone, req.body.showroom], (error, results) => {
        if (error) {
          throw error
        }

        pool.query('INSERT INTO reservation (customer, date, phone, city, reservationtype, reservationstatus, carmodel) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.email, req.body.date, req.body.phone, req.body.showroom, req.body.reservationType, req.body.reservationStatus, req.body.carModel], (error, results) => {
            if (error) {
            throw error
            }
            console.log(results);
            res.status(200).json(true)
        })
        console.log(results);
      })
}

exports.savePriceOfferRequest = (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO customer (email, name, surname, phone, city) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING', [req.body.email, req.body.name, req.body.surname ,req.body.phone, req.body.city], (error, results) => {
        if (error) {
          throw error
        }

        pool.query('INSERT INTO reservation (customer, phone, city, reservationtype, reservationstatus, carmodel) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.email, req.body.phone, req.body.showroom, req.body.reservationType, req.body.reservationStatus, req.body.carModel], (error, results) => {
            if (error) {
            throw error
            }
            console.log(results);
            res.status(200).json(true)
        })
        console.log(results);
      })

}


  
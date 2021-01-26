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

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}
exports.saveServiceRequest = (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO customer (email, name, surname, phone, city) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING', [req.body.email, req.body.name, req.body.surname ,req.body.phone, req.body.city], (error, results) => {
        if (error) {
          throw error
        }

        pool.query('INSERT INTO reservation (customer, date, phone, city, reservationtype, reservationstatus, model) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.email, req.body.date, req.body.phone, req.body.city, req.body.reservationType, req.body.reservationStatus, req.body.carModel], (error, results) => {
            if (error) {
            throw error
            }
            console.log(results);
            var uni_code = uniqueID();
            pool.query('INSERT INTO car (licencenumber, model, plate, condition, trackId, name, surname, email, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [req.body.plateNumber, req.body.carModel, req.body.plateNumber, "Waiting for Appointment Approval", uni_code, req.body.name, req.body.surname, req.body.email, req.body.city], (error, results) => {
                if (error) {
                throw error
                }
                res.status(200).json({trackId: uni_code})
            })
        })
      })
}

exports.savePriceOfferRequest = (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO customer (email, name, surname, phone, city) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING', [req.body.email, req.body.name, req.body.surname ,req.body.phone, req.body.city], (error, results) => {
        if (error) {
          throw error
        }

        pool.query('INSERT INTO reservation (customer, phone, city, reservationtype, reservationstatus, model) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.email, req.body.phone, req.body.city, req.body.reservationType, req.body.reservationStatus, req.body.carModel], (error, results) => {
            if (error) {
            throw error
            }
            console.log(results);
            res.status(200).json(true)
        })
        console.log(results);
      })

}


  
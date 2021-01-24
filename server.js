const path = require('path');
const http = require('http');
const express = require('express');
// const cors = require('cors');
const routes = require("./routes");
const app = express();
const bodyParser = require('body-parser');

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.use(express.static(path.join(path.dirname(__dirname), '/frontend/build')));
app.use("/user", routes)
app.use("/customer", routes)

const  server = http.createServer(app);
app.use((req, res /* next */) => res.status(403).json({ message: 'Not found' }));
server.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

// app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


'use strict';

var express = require('express');
var app = express();
let bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
global.__basedir = __dirname;

let router = require('./routers/file.router.js');
app.use('/', router);

// Create a Server
let server = app.listen(3000, () => {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})
// loadData("EA_result_1351.xlsx", 'where Exposure_Count_Initial=22.819672131147534');
//WHERE  REGIONS LIKE "AQUITAINE" and DEPARTEMENTS LIKE "PYRÉNÉES ATLANTIQUES"
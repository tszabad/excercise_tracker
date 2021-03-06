const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const path = require('path');
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const routes = require('./router');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);


mongoose.connect(process.env.MONGO_URI)
.then(
  () => {
    console.log("mongo opened")
    
  },
  err => {
    console.error("### error starting mongo")
    console.error(err)
  }
);


app.use(cors())
app.use(helmet())




app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const path = require('path');
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


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

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


















app.post('/api/exercise/new-user', )

app.post('/api/exercise/add', (req,res) => {
  var {userId, description, duration, date} = req.body;
  if (date.length === 0) {
  let newDate = new Date;
  var dd = newDate.getDate();
  var mm = newDate.getMonth()+1; 
  var yyyy = newDate.getFullYear();
    if(dd<10) {
    dd = '0'+dd} 
if(mm<10) {
    mm = '0'+mm} 
    date = Number(yyyy+mm+dd);
    console.log(date);
  }else{
  date = dateToNumber(date);}
  User.findById(userId, (err, user) => {
    if (err) {
      res.send('user ID not found')
    } else {
        Exercise.create({userId: userId, username: user.username, description, duration, date}, (err, exercise) => {
        if (err) {
          res.send(err);
        } else {
          res.send(`{"userId": "${userId}", "username": "${user.username}", "description": "${description}", "duration": "${duration}", "date": "${dateFromNumber(date)}"}`);
        }
  })
      
     
    }
  })
  
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

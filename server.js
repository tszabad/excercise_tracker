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




const dateToNumber = (date) => {
  if(date) {
    const year = date.slice(0,4);
    const month = date.slice(5,7);
    const day = date.slice(8);
    return Number(year + month + day);
  } else {
    return null;
  }
}

const dateFromNumber = (date) => {
  let newDate = date.toString();
  const year = newDate.slice(0,4);
  const month = newDate.slice(4,6);
  const day = newDate.slice(6);
  return `${year}-${month}-${day}`;
}







app.get('/api/exercise/log', (req,res) => {
  const userId = req.query.userId
  const from = dateToNumber(req.query.from) || 0;
  const to = dateToNumber(req.query.to) || 99999999;
  const limit = (Math.abs(0 - (req.query.limit || 0)));
  Exercise.find({
    userId,
    date: {$gt: from, $lt: to},
  }, {}, {limit}, (err,result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
      console.log(result);
    }
  })
})

app.use('/api/exercise/user', (req,res,next) => {
  const username = req.query.username;
  
  User.find({username}, (err, result) => {
    if(err) {
      res.send('User not found');
    } else {
      next();
    }
  })
})


app.get('/api/exercise/user', (req,res) => {
 
  const username = req.query.username
  User.find({username}
      ,(err,result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/api/exercise/new-user', (req,res) => {
  const username = req.body.username;
  User.create({username}, (err,user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  })
})

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

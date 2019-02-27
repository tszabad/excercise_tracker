const User = require('./user_model');
const Exercise = require('./exercise__model');

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


exports.newuser = (req, res, next) => {
  const username = req.body.username
  User.find({username}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length === 0) {
        next();
      } else {
        res.send('duplicate username not allowed');
      }
    }
  })
}

exports.userlog =(req,res,next) => {
  const _id = req.query.userId;
  User.findById(_id, (err, result) => {
    if(err) {
      res.send('User not found');
    } else {
      next();
    }
  })
}

exports.exerciselog = (req,res) => {
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
}


exports.finduser = (req,res,next) => {
  const username = req.query.username;
  
  User.find({username}, (err, result) => {
    if(err) {
      res.send('User not found');
    } else {
      next();
    }
  })
}

exports.findusername = (req,res) => {
 
  const username = req.query.username
  User.find({username}
      ,(err,result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

exports.newuser = (req,res) => {
  const username = req.body.username;
  User.create({username}, (err,user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  })
}

exports.addexercise = (req,res) => {
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
  
}
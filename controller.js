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

newuser
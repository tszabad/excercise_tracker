const User = require('./user_model');
const Exercise = require('./exercise__model');

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

const express = require('express');
const router = express.Router();


const controller = require('./controller');

router.use('/api/exercise/new-user', controller.newuser);

router.use('/api/exercise/log', controller.userlog);
router.get('/api/exercise/log', controller.exerciselog);

router.use('/api/exercise/user', controller.finduser);
router.get('/api/exercise/user', controller.findusername);
router.post('/api/exercise/new-user', controller.newuser);
router.post('/api/exercise/add', controller.addexercise)


module.exports = router;
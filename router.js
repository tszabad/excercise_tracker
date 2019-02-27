const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('./controller');

router.use('/api/exercise/new-user', controller.newuser);

module.exports = router;
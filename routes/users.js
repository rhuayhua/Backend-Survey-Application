var express = require('express');
var router = express.Router();
let useController = require('../controllers/user');



// Sign-up
///router.get('/signup', useController.renderSignup);
router.post('/signup', useController.signup);

// Sign-in
///router.get('/signin', useController.renderSignin);
router.post('/signin', useController.signin);
router.put('/edit/:username',useController.processEditProfile); // test done
// Sign-out
///router.get('/signout', useController.signout);

module.exports = router;

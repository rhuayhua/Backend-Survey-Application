var express = require('express');
var router = express.Router();
let useController = require('../controllers/user');
function requireAuth(req, res, next)
{
    // // check if the user is logged in
    // if(!req.isAuthenticated())
    // {
    //     req.session.url = req.originalUrl;
    //     return res.redirect('/users/signin');
    // }
    // next();
    passport.authenticate('tokencheck', { session: false }, function(err, user, info) {
        if (err) return res.status(401).json(
          { 
            success: false, 
            message: getErrorMessage(err)
          }
        );
        if (info) return res.status(401).json(
          { 
            success: false, 
            message: info.message
          }
        );
        // if (!user) throw new AuthError('401', 'User is not authenticated.');
        // console.log(user);
        req.user = user;
        next();
      })(req, res, next);


}


// Sign-up
///router.get('/signup', useController.renderSignup);
router.post('/signup', useController.signup);

// Sign-in
///router.get('/signin', useController.renderSignin);
router.post('/signin', useController.signin);

router.put('/edit/:id',requireAuth,useController.processEditProfile);
// Sign-out
///router.get('/signout', useController.signout);

module.exports = router;

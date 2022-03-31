let express = require('express');
let router = express.Router();

let questionController = require('../controllers/question');
let passport = require('passport');

// helper function for guard purposes
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



// Post method to handle the Edit Items process
router.post('/add/:id',requireAuth,questionController.processAddQuestion); // test done 

/* GET users listing. */
router.get('/preview/:id',questionController.showQuestions); // test done

module.exports = router;
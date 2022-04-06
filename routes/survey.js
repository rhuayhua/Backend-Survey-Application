let express = require('express');
let router = express.Router();

let surveyController = require('../controllers/survey');
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


/* GET users listing. */
router.get('/list_attend', surveyController.listSurveys);// test done

// Post method to handle the Add Items process
router.post('/add',requireAuth,surveyController.processAddSurvey); // test done

// Post method to handle the Edit Items process
router.put('/edit/:id',requireAuth,surveyController.processEditSurvey); // test done

// delete
router.delete('/delete/:id',requireAuth,surveyController.performDelete); // test done





module.exports = router;
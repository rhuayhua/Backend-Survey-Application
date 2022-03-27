let express = require('express');
let router = express.Router();

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}


/* GET users listing. */
router.get('/list_attend', surveyController.listSurveys);// test done

// Post method to handle the Add Items process
router.post('/add', surveyController.processAddSurvey); // test done

// Post method to handle the Edit Items process
router.put('/edit/:id',surveyController.processEditSurvey); // test done

// delete
router.delete('/delete/:id',surveyController.performDelete); // test done





module.exports = router;
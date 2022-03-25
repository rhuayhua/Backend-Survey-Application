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
router.get('/list_attend', surveyController.listAttend);

/* GET users listing. */
router.get('/list_edit',requireAuth, surveyController.listEdit);

// Get method to Render the Add Items Page
///router.get('/add', requireAuth,surveyController.displayAddSurvey);

// Post method to handle the Add Items process
router.post('/add', surveyController.processAddSurvey);

// Get method to Render the Edit Items Page
///router.get('/edit/:id',requireAuth,surveyController.displayEditSurvey);

// Post method to handle the Edit Items process
router.put('/edit/:id',surveyController.processEditSurvey);

// delete
router.delete('/delete/:id',surveyController.performDelete);

/* GET users listing. */
router.get('/preview/:id', requireAuth,surveyController.previewSurvey);

/* GET method to Render the attend survey*/
router.get('/attend/:id', surveyController.attendSurvey);

/* POST method to post the survey results*/
router.post('/attend/:id', surveyController.postSurveyResults);

module.exports = router;
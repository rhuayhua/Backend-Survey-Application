let express = require('express');
let router = express.Router();
let answerController = require('../controllers/answer');

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

/* POST method to post the survey results*/
router.post('/attend/:id', answerController.processResponse); // test done

module.exports = router;
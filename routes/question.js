let express = require('express');
let router = express.Router();

let questionController = require('../controllers/question');

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



// Post method to handle the Edit Items process
router.post('/add/:id',questionController.processAddQuestion); // test done 

/* GET users listing. */
router.get('/preview/:id',questionController.showQuestions); // test done

module.exports = router;
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

/* GET users listing. */
router.get('/add/:id', requireAuth,questionController.displayAddQuestion);

// Post method to handle the Edit Items process
router.post('/add/:id',requireAuth,questionController.processAddQuestion);

module.exports = router;
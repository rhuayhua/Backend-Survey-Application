let Question = require('../models/question');


module.exports.displayAddQuestion = (req, res, next) => {
    
    let newItem = Question();

    res.render(
        'question/add', 
        {
            title: 'Add a new Question',
            item: newItem,
            userName: req.user ? req.user.username : '' 
        }
    )          
}


module.exports.processAddQuestion = (req, res, next) => {
    let id = req.params.id

    let newItem = Question({
        surveyId: id,
        question: req.body.question,
        options: req.body.options
    });

     console.log(newItem);


    Question.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(item);
            res.redirect('/survey/list_edit');// redirect to page to add questions
        }
    });


}

  
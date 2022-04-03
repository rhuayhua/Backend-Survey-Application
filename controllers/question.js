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


module.exports.processAddQuestionMC = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    console.log(req.body.question);

    let newItem = Question({
        surveyId: id,
        question: req.body.question,
        options: req.body.options.split(",").map(word => word.trim())
        //options: req.body.options
    });

    console.log("before create new row"); 
    console.log(newItem);


    Question.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            return res.status(400).json(///
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
              );
        }
        else
        {
            console.log("added");
            console.log(item);
            ///res.redirect('/survey/list_edit');// redirect to page to add questions
            res.status(200).json(item);
        }
    });

}

exports.showQuestions = function (req, res, next) {


    let id = req.params.id;
    console.log("here");
    console.log(id);
    //.find( { _id: 5 } )
    Question.find({ surveyId: id }, (err, survey) => {
        if (err) {
            console.error(err);
            return res.status(400).json(///
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
              );
        }
        else {
            console.log(survey);
            // res.render(
            //     'survey/preview',
            //     {
            //         title: 'Preview Survey',
            //         survey: survey,
            //         surveyId: id
            //     }
            // );

            res.status(200).json(survey);
        }
    })
}

module.exports.processAddQuestionAD = (req, res, next) => {
    let id = req.params.id;
    console.log("Inside processAddQuestionAgDsg");
    console.log(id);
    console.log(req.body.question);

    let qs = req.body.question.split(",").map(word => word.trim());
    console.log(qs);

    let arrayQ = [];
    for (let i = 0; i < qs.length; i++) {
        arrayQ[i] = {surveyId: id, question: qs[i]};
      } 

    console.log("This is arrayQ", arrayQ);
    Question.insertMany(arrayQ, (err, item) =>{
        if(err)
        {
            console.log(err);
            return res.status(400).json(///
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
              );
        }
        else
        {
            console.log("added");
            console.log(item);
            ///res.redirect('/survey/list_edit');// redirect to page to add questions
            res.status(200).json(item);
        }
    });

}

  
let Answer = require('../models/answer');

exports.processResponse = (req, res, next) => {
    let id = req.params.id;

    let answerArray = [];

    const obj = Object.assign({}, req.body)

    for (var ans in obj) {
        if (obj.hasOwnProperty(ans)) {
            answerArray.push(obj[ans])
        }
    }

    let userAnswers = Answer({
        surveyId: id,
        responses: answerArray
    })

    Answer.create(userAnswers, (err, item) => {
        if (err) {
            console.log(err)
            return res.status(400).json(
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );
        }

        else {
            console.log(item);
            ///res.redirect('/survey/list_attend');
            res.status(200).json(item);///
        }
    });

}

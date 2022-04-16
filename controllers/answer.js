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


// exports.listReport = function (req, res, next) {


//     const pipeline = [
//         {
//             '$group': {
//                 '_id': '$surveyId',
//                 numberOfResponses: {$sum:1}
//             }
//         },

//         {
//             	$lookup:{	
//                     from: 'survey',
//                     localField: "_id",
//                     foreignField: '_id',
//                     as: 'surveyans'
//                 }
//         },

//         { 
//             $replaceRoot: {newRoot:{$mergeObjects: [{$arrayElemAt: ["$surveyans",0]},"$$ROOT"]  }}
//         },

       

//         {$project:
//             {_id:1,
//             numberOfResponses:1,
//             title: 1,
//             type: 1
//             }
//         }
//     ];

//     Answer.aggregate(pipeline, (err, responsesList) => {
//         if (err) {
//             console.error(err);
//             return res.status(400).json(///
//                 { 
//                   success: false, 
//                   message: getErrorMessage(err)
//                 }
//               );
//         }
//         else {
//             console.log(responsesList);
//             res.status(200).json(responsesList);
//         }
//     })



   
// }

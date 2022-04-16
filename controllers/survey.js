let Survey = require('../models/survey');


function getErrorMessage(err) { ///
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};


exports.listSurveys = function (req, res, next) {

    Survey.find((err, surveyList) => {
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
            console.log(surveyList);
            res.status(200).json(surveyList);
        }
    })
}




// module.exports.displayAddSurvey = (req, res, next) => {

//     let newItem = Survey();

//     res.render(
//         'survey/add_edit',
//         {
//             title: 'Add a new Survey',
//             item: newItem,
//             userName: req.user ? req.user.username : ''
//         }
//     )
// }

module.exports.processAddSurvey = (req, res, next) => {

    let newItem = Survey({
        _id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate

    });

    Survey.create(newItem, (err, item) => {
        if (err) {
            console.log(err);
            ///res.end(err);
            return res.status(400).json(
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );
        }
        else {
            console.log("added");
            console.log(item);
            ///res.redirect('/survey/list_edit');// redirect to page to add questions
            res.status(200).json(item);///
        }
    });
}

// module.exports.displayEditSurvey = (req, res, next) => {
//     let id = req.params.id;

//     Survey.findById(id, (err, itemToEdit) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             //show the edit view
//             res.render(
//                 'survey/add_edit',
//                 {
//                     title: 'Edit Survey',
//                     item: itemToEdit,
//                     userName: req.user ? req.user.username : ''
//                 }
//             )
//         }
//     });
// }

module.exports.processEditSurvey = (req, res, next) => {
    let id = req.params.id

    let updatedItem = Survey({
        ///_id: req.body.id,
        _id: id,
        title: req.body.title,
        type: req.body.type,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

     console.log(updatedItem);

    Survey.updateOne({ _id: id }, updatedItem, (err) => {
        if (err) {
            console.log(err);
            //res.end(err);
            return res.status(400).json(///
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );

        }
        else {
            console.log(req.body);
            // refresh the book list
            ///res.redirect('/survey/list_edit');
            return res.status(200).json(///
                { 
                    success: true, 
                    message: 'Item updated successfully.'
                }
            );
        }
    });
}



module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            //res.end(err);
            return res.status(400).json(///
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );
        }
        else {
            // refresh the book list
            //res.redirect('/survey/list_edit');
            return res.status(200).json(///
                { 
                    success: true, 
                    message: 'Item deleted successfully.'
                }
            );
        }
    });
}

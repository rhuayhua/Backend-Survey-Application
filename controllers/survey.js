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



module.exports.processAddSurvey = (req, res, next) => {

    let newItem = Survey({
        _id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        username: req.body.username

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



module.exports.processEditSurvey = (req, res, next) => {
    let id = req.params.id

    console.log("User trying to edit is:",req.user.username);

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

    ////////////////////////
    Survey.findById(id, (err, surveytoCheck) => {
        if (err) {
            console.log("coudn't find survey");
            return res.status(400).json(///
                    { 
                        success: false, 
                        message: 'coudnt find survey'
                    }
                );
        }
        else {
            //show the edit view
            console.log("owner of survey is: ",surveytoCheck.username);

            
            if (req.user.username == surveytoCheck.username) {
        
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
            else {
                return res.status(400).json(///
                            { 
                                success: false, 
                                message: 'unauthorized user'
                            }
                        );
              
            }
        

        }
    });


    
}



module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    // check username
    console.log("User trying to delete is:",req.user.username);

    Survey.findById(id, (err, surveytoCheck) => {
        if (err) {
            console.log("coudn't find survey");
            return res.status(400).json(///
                    { 
                        success: false, 
                        message: 'coudnt find survey'
                    }
                );
        }
        else {
            //show the edit view
            console.log("owner of survey is: ",surveytoCheck.username);

            ///////////////////////
            if (req.user.username == surveytoCheck.username) {
        
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
            else {
                return res.status(400).json(///
                            { 
                                success: false, 
                                message: 'unauthorized user'
                            }
                        );
              
            }
        

        }
    });

    
}

exports.countSurveys = function (req, res, next) {

    const pipeline = [
        {
            '$group': {
                '_id': '$type',
                SurveysbyType: {$sum:1}
            }
        }
    ];

    Survey.aggregate(pipeline, (err, responsesList) => {
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
            console.log(responsesList);
            res.status(200).json(responsesList);
        }
    })



   
}

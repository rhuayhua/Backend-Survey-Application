let mongoose = require('mongoose');

let answerModel = mongoose.Schema(
    {
        //surveyId: String,
        surveyId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Survey'},
        responses: [String]

    },

    {
        collection: "answer"
    }
);

module.exports = mongoose.model('Answer',answerModel);
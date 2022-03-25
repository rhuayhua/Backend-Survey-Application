let mongoose = require('mongoose');

let answerModel = mongoose.Schema(
    {
        surveyId: String,
        responses: [String]

    },

    {
        collection: "answer"
    }
);

module.exports = mongoose.model('Answer',answerModel);
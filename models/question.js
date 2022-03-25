let mongoose = require('mongoose');

let questionModel = mongoose.Schema(
    {
        surveyId: String,
        question: String,
        options: [String]
    },

    {
        collection: "question"
    }
);

module.exports = mongoose.model('Question',questionModel);

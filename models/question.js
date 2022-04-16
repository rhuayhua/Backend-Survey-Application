let mongoose = require('mongoose');

let questionModel = mongoose.Schema(
    {
        //surveyId: String,
        surveyId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Survey'},
        question: String,
        options: [String]
    },

    {
        collection: "question"
    }
);

module.exports = mongoose.model('Question',questionModel);

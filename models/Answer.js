var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answerText: [],
  submitted: { type: Date, default: Date.now }
});



var Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
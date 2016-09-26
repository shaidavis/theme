var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  answerOptions: [],
  inputType: String, 	// <- can be: "text," "integer," "radio," "multiple" 
  category: String, 	// <- can be: "personal," "demographic," "personality"
  visible: {type: Boolean, default: true},
  graphType: String,	// <- can be: "bar," "line," "pie"
  source: {type: String, default: "input"},		// <- can be: "input," "facebook," "browser"
  weight: { type: Number, min: 1, max: 10, default: 10 }
});



var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;


Question.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
 };
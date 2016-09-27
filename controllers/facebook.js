var Question = require('../models/Question');
var Answer = require('../models/Answer');
var User = require('../models/User');




exports.getThisUserFacebookInfo = function (req, res, next){
  console.log("3. inside the getThisUserFacebookInfo route") 
  console.log("****", req.user.id)
  User.findById(req.user.id)      
      .exec(function (err, user){
      console.log(user)
      res.json(user)
    })
}
exports.getAllUserFacebookInfo = function (req, res, next){
  console.log("3. inside the getAllUserFacebookInfo route") 
  
  User.find()      
      .exec(function (err, user){
      console.log(user)
      res.json(user)
    })
}



exports.questionsGet = function(req, res, next) {  
  Question.find(function(err, questions){
    if(err){ return next(err); }
    // console.log(questions)
    res.json(questions);
  });
};

//GET A RANDOM QUESTION - THIS WORKS - backup copy of function
exports.questionsGetRandom = function(req, res, next) {  
  Question.random(function(err, randomQuestion){
    console.log(randomQuestion);
    res.json(randomQuestion);
  });  
};

exports.questionPost = function(req, res, next) {

  console.log("req.body", req.body)
  console.log("I'm in the route!")
  var question = new Question(req.body);

  question.save(function(err, question){
    if(err){ return next(err); }

    res.json(question);
  });
};
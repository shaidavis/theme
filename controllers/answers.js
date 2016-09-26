var express = require('express');
var router = express.Router()

var Answer = require('../models/Answer');
var User = require('../models/User');
var Question = require('../models/Question')
/**
 * GET /all answers to all questions
 '/answers'*/
exports.answersGet = function(req, res, next) {
  Answer.find(function(err, answers){
    if(err){ return next(err); }

    res.json(answers);
  });
};



/* GET / return a JSON of a single answer, given its answer ID 
'/answers/:answer'*/
exports.returnSingleAnswer = function(req, res, next) {
    res.json(req.answer)  
}


/* GET /all answers to a particular question, given a questionID 
'/questions/:question/answers'*/
exports.allAnswersToQuestion = function(req, res, next) {
  console.log('question id:', req.question._id)
  Answer.find({questionID:req.question._id},function (err, allAnswers){
      if (err) {return next(err); }
      if (!allAnswers) {return next(new Error('can\'t find answers')); }
      // console.log("allAnswers are:", allAnswers)
  res.json(allAnswers)    
  }) 
};

/**
 * POST /answer
 */
exports.answerPost = function(req, res, next) {
  console.log("5. I'm in the route!")
  console.log(req.user)
  req.body.userID = req.user.id;  
  console.log(req.body)
  var answer = new Answer(req.body);
  console.log("6. answer from the post route:", answer)
  answer.save(function(err, answer){
    if(err){ return next(err); }

    console.log(answer)
    console.log("req.user.answers BEFORE PUSH", req.user.answers)
    req.user.answers.push(answer)
    console.log("req.user.answers AFTER PUSH", req.user.answers)
    req.user.save()
    res.json(answer);
  });
};

// GET USERS ANSWERED QUESTIONS
exports.getUsersAnsweredQs = function (req, res, next){
  // req.body.userID = req.user.id;  
  console.log("****", req.user.id)
  User.findById(req.user.id)
      .populate('answers')
      .exec(function (err, userAnswers){
      console.log(userAnswers)
      res.json(userAnswers)
    })
}



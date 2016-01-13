var express = require('express')
//config knex later
// var knex = require('knex')
var router = express.Router();

// function Connections(){
//   return knex('connection')
// }


router.post('/new', function(req, res){
  console.log("I heard a new!")
})

router.get('/', function(req, res){
  console.log("I heard a get all!")
})

router.get('/:id', function(req, res){
  console.log("I heard a get one!")

})

router.put('/:id', function(req, res){
  console.log("I heard an update!")
})

module.exports = router;

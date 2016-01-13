var express = require('express')
var router = express.Router();

// function Connections(){
//   return knex('connection')
// }


router.post('/new', function(req, res){
  create.create()
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

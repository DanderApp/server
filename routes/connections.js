var express = require('express')
var router = express.Router();
var crud = require('../crud_functions');
var retrieve = require('../retrieve');
var filter = require('../filter')
//works
router.post('/new', function(req, res){
  console.log("New doge!")
  crud.Connection.createConnection(req.body.user_id, req.body.petfinder_id, req.body.liked)
  .then(function(data){
    console.log(data);
    res.json({id:data[0]});
  })
})

// works
router.get('/', function(req, res){
  console.log("I heard a get all!")
  crud.Connection.userConnection(req.query.id)

  .then(function(data){
    return new Promise(function(resolve, reject){
      var petfinderArray = [];
      for(i=0; i<data.length; i++){
        petfinderArray.push(data[i].petfinder_id);
      }
      // console.log(petfinderArray);
      resolve(petfinderArray);
    })
  })
  .then(function(petfinderArray){
      var promiseStack = [];
      for(i=0; i<petfinderArray.length; i++){
        promiseStack.push(retrieve(petfinderArray[i]))
      }
      return Promise.all(promiseStack)
  })
  .then(function(petfinderArray){
    return new Promise(function(resolve, reject){
      resolve(filter.format(petfinderArray))
    })
  })
  .then(function(data){
    res.json(data);
  })
})

//works
router.get('/:id', function(req, res){
  console.log("I heard a get one!")
  crud.Connection.checkConnection(req.query.id, req.params.petfinder_id)
  .then(function(data){
    res.json(data);
  })
})

//works
router.put('/:id', function(req, res){
  console.log("I heard an update!")
  crud.Connection.updateConnection(req.query.id, req.body.petfinder_id, req.body.liked)
  .then(function(){
    res.json('Totally updated!')
  })
})

module.exports = router;

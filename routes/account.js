var express = require('express')
var router = express.Router();
var crud = require('../crud_functions')


router.get('/', function(req, res){
  console.log("I heard a get!")
  crud.User.readAllUsers().then(function(data){
    res.json(data);
  })
})

router.get('/:id', function(req, res){
  crud.User.readOneUser(req.user.id).then(function(data){
    res.json(data);
  })

  // if req.user.id === id
  //   res.json(their-data)
  // else {
  //   res.send('404 not found')
  // }
})

router.put('/:id/update', function(req, res){
  console.log("I heard an update!")
  crud.User.updateUser(req.user.id, req.user.email).then(function(){

  })
})

router.delete('/:id/delete', function(req, res){
  console.log("I heard a delete!")

  crud.User.deleteUser(req.user.id).then(function(){

  })
})

module.exports = router;

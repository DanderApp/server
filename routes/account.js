var express = require('express')
var router = express.Router();
var crud = require('../crud_functions')



router.post('/create', function(req, res){
  console.log('I heard a create!')
  
})


//works
router.get('/', function(req, res){
  console.log("I heard a get!")
  crud.User.readAllUsers().then(function(data){
    res.json(data);
  })
})

//works
router.get('/:id', function(req, res){
  crud.User.readOneUser(req.params.id).then(function(data){
    res.json(data);
  })

  // if req.user.id === id
  //   res.json(their-data)
  // else {
  //   res.send('404 not found')
  // }
})

//works as email
router.put('/update', function(req, res){
  console.log("I heard an update!")
  crud.User.updateUser(req.body.id, req.body.email).then(function(){
    res.json('email updated!')
  })
})

//works
router.delete('/:id/delete', function(req, res){
  console.log("I heard a delete!")

  crud.User.deleteUser(req.params.id).then(function(){
    res.json('baleted successful')
  })
})

module.exports = router;

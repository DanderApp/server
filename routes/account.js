var express = require('express')
var router = express.Router();


router.get('/', function(req, res){
  console.log("I heard a get!")
  // if req.user.level === 'admin'
  //   res.json(all-the-data)
  // else {
  //   res.send('404')
  // }
})

router.get('/:id', function(req, res){
  // if req.user.id === id
  //   res.json(their-data)
  // else {
  //   res.send('404 not found')
  // }
})

router.put('/:id/update', function(req, res){
  console.log("I heard an update!")

})

router.delete('/:id/delete', function(req, res){
  console.log("I heard a delete!")

})

module.exports = router;

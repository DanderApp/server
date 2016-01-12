var request = require('request');
var parseString = require('xml2js').parseString;
require('dotenv').load()

var requestFunction = function() {

  request('http://api.petfinder.com/pet.getRandom?key=' +
  process.env.PF_Key +
  '&callback=?&output=basic', function(error, response, body){
  if(!error && response.statusCode==200){
    parseString(response.body, function(err, result){
      JSON.stringify(result);
      console.log(result.petfinder.pet[0])
    })
  } else{
    console.dir("whoops", response.statusCode)
  }
})
}

// requestFunction();

module.exports = requestFunction;

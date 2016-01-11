var request = require('request');
var parseString = require('xml2js').parseString;

var requestFunction = function() {

  request('http://api.petfinder.com/pet.getRandom?key=7e22a230c9629845bcfcad9d236be656&callback=?&output=basic', function(error, response, body){
  if(!error && response.statusCode==200){
    parseString(response.body, function(err, result){
      JSON.stringify(result);
      console.log(result.petfinder.pet[0].name)
    })
  } else{
    console.dir("whoops", response.statusCode)
  }
})
}

module.exports = requestFunction;

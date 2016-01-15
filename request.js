var unirest = require('unirest');
var parseString = require('xml2js').parseString;
require('dotenv').load()

var requestFunction = function(zipcode) {
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.petfinder.com/pet.find')
      .query({
        'key': process.env.PF_Key,
        "callback": "?",
        "output": 'basic',
        "animal": "dog",
        "location": zipcode || "80205",
        "count": "100"
      })
      .as.json(function(response) {
        resolve(response);
      })
    })
}

function stringParser(stringToParse) {
  return new Promise(function(resolve,reject) {
    parseString(stringToParse,function(err, result) {
      resolve(result);
    })
  })
}

function apiCall(zipcode) {
  return new Promise(function(resolve, reject) {
    requestFunction(zipcode).then(function(response) {
      return stringParser(response.body);
    })
    .then(function(response) {
      resolve(response);
    })
  })
}



module.exports = apiCall;

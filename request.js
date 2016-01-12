var unirest = require('unirest');
var parseString = require('xml2js').parseString;
require('dotenv').load()

var requestFunction = function() {
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.petfinder.com/pet.getRandom')
      .query({'key': process.env.PF_Key, "callback": "?", "output": 'basic'})
      .as.json(function(response) {
        resolve(response);
      })
    })
}

function stringParser(stringToParse) {
  return new Promise(function(resolve,reject) {
    parseString(stringToParse,function(err, result) {
      // console.log('parsing');
      resolve(result);
    })
  })
}

function apiCall() {
  return new Promise(function(resolve, reject) {
    requestFunction().then(function(response) {
      return stringParser(response.body);
    })
    .then(function(response) {
      resolve(response);
    })
  })
}

module.exports = apiCall;

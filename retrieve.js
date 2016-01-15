var unirest = require('unirest');
var parseString = require('xml2js').parseString;
require('dotenv').load()

var requestFunction = function(petID) {
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.petfinder.com/pet.get')
      .query({
        'key': process.env.PF_Key,
        "callback": "?",
        "id" : petID
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

function getPet(petID) {
  return new Promise(function(resolve, reject) {
    requestFunction(petID).then(function(response) {
      return stringParser(response.body);
    })
    .then(function(response) {
      resolve(response);
    })
  })
}

module.exports = getPet;

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
        "count": "5"
      })
      .as.json(function(response) {
        resolve(response);
      })
    })
}

var singletonRequest = function(pfid) {
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.petfinder.com/pet.get')
      .query({
        'key': process.env.PF_Key,
        'callback': '?',
        'id': pfid
      })
      .as.json(function(response){
        resolve(response)
      });
  })
}

singletonRequest(30519898).then(function(response) {
  console.log(response.body);
})

function stringParser(stringToParse) {
  return new Promise(function(resolve,reject) {
    parseString(stringToParse,function(err, result) {
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

function singletonAPICall(pfid) {
  return new Promise(function(resolve, reject) {
    singletonRequest(pfid).then(function(response) {
      return stringParser(response.body);
    })
    .then(function(response) {
      resolve(response);
    })
  })
}

// singletonAPICall(30519898).then(function(data) {
//   console.log(data);
// })

module.exports = apiCall;

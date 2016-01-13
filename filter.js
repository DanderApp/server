// var request = require('./request.js')

module.exports = {
  filterDogs: function filterDogs(responseData) {
    return new Promise(function(resolve, reject) {
      // Remove the index when looping
      var returnData = [];
      for(i=0; i<responseData.petfinder.pets[0].pet.length; i++){
        var data = responseData.petfinder.pets[0].pet[i]
        // console.log(data)
        var newDog          = {};
        newDog.name         = data.name[0];
        newDog.age          = data.age[0];
        newDog.sex          = data.sex[0];
        newDog.size         = data.size[0];
        newDog.description  = data.description[0];
        newDog.petfinder_id = data.id[0];
        newDog.photo        = data.media[0].photos[0].photo[2]["_"];
        console.log(data.media)
        returnData.push(newDog)
      }
      resolve(returnData);
    });
  }
};
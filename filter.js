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
        newDog.name         = data.name;
        newDog.age          = data.age;
        newDog.sex          = data.sex;
        newDog.size         = data.size;
        newDog.description  = data.description;
        newDog.petfinder_id = data.id;
        returnData.push(newDog)
      }
      resolve(returnData);
    });
  }
};

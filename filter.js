var request = require('./request.js')

module.exports = {
  filterDogs: function filterDogs(responseData) {
    return new Promise(function(resolve, reject) {
      // Remove the index when looping
      var data = responseData.petfinder.pet[0]
      var newDog          = {};
      newDog.name         = data.name;
      newDog.age          = data.age;
      newDog.sex          = data.sex;
      newDog.size         = data.size;
      newDog.description  = data.description;
      newDog.petfinder_id = data.id;
      resolve(newDog);
    });
  }
};

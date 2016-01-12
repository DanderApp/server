var request = require('./request.js')

var testData =
[ { id: ['32887926'],
    shelterId: [ 'VA336' ],
    shelterPetId: [ '' ],
    name: [ 'Angel' ],
    animal: [ 'Cat' ],
    breeds: [ [Object] ],
    mix: [ 'yes' ],
    age: [ 'Senior' ],
    sex: [ 'F' ],
    size: [ 'M' ],
    options: [ [Object] ],
    description: [ 'HI, EVERYONE! I\'M ANGEL. I\'M A VERY SWEET KITTY, BUT YOU NEED TO GO SLOW WITH ME. I\'VE BEEN HERE FOR SOME TIME NOW AND I\'M LOOKING FOR MY FUREVER HOME. I LOVE TOYS AND HAVING SPACE SO I CAN STRETCH MY LEGS! I NEED SOMEONE THAT IS GOING TO HAVE PATIENCE AND WORK WITH ME. I PROMISE I\'LL BE THE BEST KITTY AND CUDDLE WITH YOU, I JUST NEED SOME TIME TO ADJUST. IF I SOUND LIKE A GOOD FIT, VISIT ME TODAY!\n\nAge: 7 years' ],
    lastUpdate: [ '2016-01-09T03:53:42Z' ],
    status: [ 'A' ],
    media: [ [Object] ],
    contact: [ [Object] ] } ];

// filterDogs(request)

module.exports = {
  filterDogs: function filterDogs(responseData) {
    // console.log(responseData.petfinder.pet[0]);
    var data = responseData.petfinder.pet[0]
    var newDog          = {};
    newDog.name         = data.name;
    newDog.age          = data.age;
    newDog.sex          = data.sex;
    newDog.size         = data.size;
    newDog.description  = data.description;
    newDog.petfinder_id = data.id;
    console.log(newDog);
  }
};

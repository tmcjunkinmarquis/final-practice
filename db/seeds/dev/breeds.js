let breedsData = [
  {
    name: 'Bichon Frisee',
    countryOfOrigin: 'France',
    pets: [
      {name:'Yvette', color: 'white', age: 5},
      {name:'Gaston', color: 'white with spot', age: 5}
    ]
  },
  {
    name: 'Portugese Water Dog',
    country_of_origin: 'Portugal',
    pets: [
      {name:'Bo', color: 'black', age: 10}
    ]
  }
];

const createPet = (knex, pet) => {
  return knex('pets').insert(pet);
};

const createBreed = (knex, breed) =>{
  return knex('breeds').insert({      
    breed_name: breed.name,               
    country_of_origin: breed.countryOfOrigin
  }, 'id')                            
    .then(breedId => {                
      let petPromises = [];

      breed.pets.forEach(pet => {  
        petPromises.push(         
          createPet(knex, {
            name: pet.name,
            age: pet.age,
            color: pet.color,
            breed_id: breedId 
          })
        );
      });

      return Promise.all(petPromises);
    });
};

exports.seed = (knex, Promise) => {
  return knex('pets').del()
    .then(()=>knex('breeds').del())
    .then(()=>{

      let breedsPromises = [];
      breedsData.forEach(breed => {
        breedsPromises.push(createBreed(knex, breed));
      });
      return Promise.all(breedsPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};



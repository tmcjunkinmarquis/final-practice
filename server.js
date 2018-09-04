const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.port || 3000);
app.locals.title = '** Final Practice **';

// app.locals.puppies=[
//   {id: 1, name: "Yvette", age: 5, color: "white"},
//   {id: 2, name: "Gaston", age: 5, color: "white with a tan spot"}
// ];

// app.get('/api/v1/cute-puppies', (request, response) => {
//   const cutePuppies = app.locals.puppies;
//   try {
//     response.status(200).json({ cutePuppies });

//   } catch (error) {
//     response.status(500).json({ error });
//   }
// });

app.get('/', (request, response)=> {
  response.send('I am practicing for the final');
});

// app.get('/api/v1/senators', (request, response) => {
//   database('senators').select()
//     .then((senators) => {
//       response.status(200).json(senators);
//     })
//     .catch((error) => {
//       response.status(500).json({ error });
//     });
// });
app.get('/api/v1/cute-puppies', (request, response)=>{
  database('pets').select()
    .then((pets)=>{
      response.status(200).json(pets);
    })
    .catch((error)=>{
      response.status(500).json({ error });
    });
});


app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  
});

module.exports = app;
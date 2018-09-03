const express = require('express')
const app = express()

app.set('port', process.env.port || 3000)
app.locals.title = '** Final Practice **'

app.locals.puppies=[
  {name: "Yvette", age: 5, color: "white"},
  {name: "Gaston", age: 5, color: "white with a tan spot"}
]

app.get('/', (request, response)=> {
  response.send('I am practicing for the final')
})

app.get('api/v1/cute-pets', (request, response)=>{
  const cute-pets = app.locals.cute-pets;
  response.json({puppies})
})

app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  
})
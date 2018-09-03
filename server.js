const express = require('express')
const app = express()

app.set('port', process.env.port || 3000)
app.locals.title = '** Final Practice **'

app.locals.puppies=[
  {id: 1, name: "Yvette", age: 5, color: "white"},
  {id: 2, name: "Gaston", age: 5, color: "white with a tan spot"}
]

app.get('/', (request, response)=> {
  response.send('I am practicing for the final')
})

app.get('/api/v1/cute-puppies', (request, response)=>{
  const cutePuppies = app.locals.puppies;
  response.json({cutePuppies})
})

app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  
})
const express = require('express')
const app = express()

app.set('port', process.env.port || 3000)
app.locals.title = '** Final Practice **'

app.get('/', (request, response)=> {
  response.send('I am practicing for the final')
})

app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  
})
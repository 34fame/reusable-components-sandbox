const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use((request, response, next) => {
   // console.log(Object.keys(request))
   // console.log('query', request.query)

   next()
})

/* START Add endpoints here */
app.get('/hello', (request, response) => {
   response.status(200).send('Hello, World!')
})

app.get('/hello/:name', (request, response) => {
   console.log('params', request.params)
   response.status(200).send(`Hello, ${request.params.name}!`)
})
/* END */

app.use((request, response) => {
   response.status(404).send(`Endpoint ${request.originalUrl} not found`)
})

exports.api = functions.https.onRequest(app)

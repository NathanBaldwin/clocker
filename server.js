'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

//middleware:
app.use(bodyParser.urlencoded({
  extended:false
}))

//create paths to public directory:
app.use(express.static('public'));

//routes:
app.get('/', (req, res) => {
  res.sendfile('./public/')
})

//tell server to listen on specified port:
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})

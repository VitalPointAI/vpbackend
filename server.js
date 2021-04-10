const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const axios = require('axios').default

 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nearpersonas.com")
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "GET")
   next()
 });

app.get('/appseed', async (req, res) => {
  let seed
  try{
    let code = process.env.CODE
    seed = await axios.get('https://personas.azurewebsites.net/api/seed?code='+code)
  } catch (err) {
    console.log('error retrieving seed', err)
    res.send('error')
  }
 
  res.send(seed.data);
 });

 app.get('/didkey', async (req, res) => {
  let seed
  try{
    let code = process.env.DID
    seed = await axios.get('https://personas.azurewebsites.net/api/didkey?code='+code)
  } catch (err) {
    console.log('error retrieving seed', err)
    res.send('error')
  }
 
  res.send(seed.data);
 });


app.listen(process.env.PORT || 8080);
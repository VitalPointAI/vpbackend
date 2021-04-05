const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const axios = require('axios').default
//const helmet = require('helmet')
//const compression = require('compression')

// Azure authentication library to access Azure Key Vault
//const { DefaultAzureCredential } = require("@azure/identity")
//const { SecretClient } = require("@azure/keyvault-secrets")

// Azure SDK clients accept the credential as a parameter
//const credential = new DefaultAzureCredential()
//let vaultUrl = 'https://vitalpointkeys.vault.azure.net/'

// Create authenticated client
//const client = new SecretClient(vaultUrl, credential)

//app.use(express.static(path.join(__dirname, 'dist')));

 //app.use(helmet());
 //app.use(compression()); //Compress all routes

 app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "nearpersonas.com"); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Methods', 'GET');
//   res.header("Access-Control-Allow-Headers", "Content-Type");
   next()
 });

app.get('/appseed', async (req, res) => {
  let seed
  try{
    let code = process.env.CODE
    console.log(code)
    seed = await axios.get('https://personas.azurewebsites.net/api/seed?code='+code)
    console.log('seed', seed)
  } catch (err) {
    console.log('error retrieving seed', err)
    res.send('error')
  }
  // let getResult
  // try{
  // getResult = await client.getSecret("APPSEED")
  // } catch (err) {
  //   console.log('error retrieving secret', err)
  // }
  res.send(seed.data);
 });


app.listen(process.env.PORT || 8080);
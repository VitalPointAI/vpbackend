const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
var cors = require('cors')

// Azure authentication library to access Azure Key Vault
const { DefaultAzureCredential } = require("@azure/identity")
const { SecretClient } = require("@azure/keyvault-secrets")

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential()
let vaultUrl = 'https://vitalpointkeys.vault.azure.net/'

// Create authenticated client
const client = new SecretClient(vaultUrl, credential)

//app.use(express.static(path.join(__dirname, 'dist')));

// var corsOptions = {
//   origin: 'https://nearpersonas.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nearpersonas.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/appseed', cors({origin: 'https://nearpersonas.com'}), async (req, res, next) => {
  let getResult
  try{
  getResult = await client.getSecret("APPSEED")
  } catch (err) {
    console.log('error retrieving secret', err)
  }
  res.send(getResult);
 });

 app.get('/didkey', cors({origin: 'https://nearpersonas.com'}), async (req, res, next) => {
  let getResult
  try{
  getResult = await client.getSecret("DIDCONTRACTPRIVKEY")
  } catch (err) {
    console.log('error retrieving secret', err)
  }
  res.send(getResult);
 });

app.listen(process.env.PORT || 8080);
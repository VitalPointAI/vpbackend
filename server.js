const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/appseed', async (req, res) => {
    let code = process.env.APP_SEED
    res.send(code);
 });

 app.get('/airtable', async (req, res) => {

  const airtable = {
      airtableKey: process.env.AIRTABLE_KEY,
      contributorBase: process.env.CONTRIBUTOR_BASE,
      contributorTable: process.env.CONTRIBUTOR_TABLE,
      projectBase: process.env.PROJECT_BASE,
      projectTable: process.env.PROJECT_TABLE
  }
 
  res.send(airtable);
 });


app.listen(process.env.PORT || 8080);
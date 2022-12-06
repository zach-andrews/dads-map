const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs');


app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send(fs.readdirSync(`../data/visited/${req.query.countrycode}/`, {withFileTypes: true}).map(item => `./data/visited/${req.query.countrycode}/${item.name}`))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
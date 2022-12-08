const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs');


app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send(fs.readdirSync(`../data/visited/${req.query.countrycode}/`, {withFileTypes: true}).map(item => `./data/visited/${req.query.countrycode}/${item.name}`))
})

app.get('/update', (req, res) => {
  // get the name of all folders in data/visited
  var visited_list = fs.readdirSync(`../data/visited/`, {withFileTypes: true}).map(item => item.name) 
// load in existing json
  let countries = JSON.parse(fs.readFileSync('../data/countries.geojson'));
  let visited = JSON.parse(fs.readFileSync('../data/data.json'));
  let visited_data = visited['features'].map(item => item['properties']['ISO_A3'])
  let diff_countries = visited_list.filter(x => !visited_data.includes(x));
  for(const country of countries['features']) {
    if (diff_countries.includes(country['properties']['ISO_A3'])){
        visited['features'].push(country)
    }
  }
  fs.writeFileSync('../data/data.json', JSON.stringify(visited));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
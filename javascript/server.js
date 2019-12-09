

// this is a single route, in the simplest possible format
// the simplest format is not necessarily the best one.
// this is, right now, an introduction to Callback Hell
// but it is okay for a first-level example
/*
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/api', (req, res) => {
    const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson';
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
})
*/
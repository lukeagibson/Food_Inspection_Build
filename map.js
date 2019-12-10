const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());





console.log("open")
app.use(express.static('public'));
console.log("done")


var blacklist = [];

var baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson';
fetch(baseURL)
    .then((r) => r.json())
    .then((r) => {
        console.log("printing");
        console.log(r);
        var data = r;
        return r;
        })
    .catch((err) => {
        console.log("error")
        console.log(err);
        res.redirect('/error');
      });

app.get('/api', (req, res) => {
    fetch(baseURL)
        .then((r) => r.json())
        .then((r) => {
            console.log("printing");
            console.log(r);
            // console.log("filtering")
            // var filteredjson;
            // filteredjson.features = r.features.filter(item => !(item.establishment_id in blacklist))
            // console.log(filteredjson)
            var data = r;
            res.send(r);
            return r;
        })
        .catch((err) => {
            console.log("error")
            console.log(err);
            res.redirect('/error');
          });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/', function (req, res) {
    baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson';
    res.send("URL has been reset.")
  });

app.put('/', function (req, res) {
    baseURL = req.body.url
    res.send("Base URL has been updated!")
  })

// app.delete('/', function (req, res) {
//     blacklist.push(req.body.establishment_id);
//     console.log("Now blocking the following establishment IDs:");
//     for (var item in blacklist) {
//         console.log(blacklist[item])
//     }
//     res.send("Deleted entries if they exist.")
//   });


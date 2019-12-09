const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());





console.log("open")
app.use(express.static('public'));
console.log("done")

   
// var data =$.ajax({
//     url: "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson",
//     dataType: "json",
//     success: console.log("Data successfully loaded."),
//     error: function(xhr) {
//         alert(xhr.statusText)
//     }
// })

// $.when(data).done(function() {
app.get('/api', (req, res) => {
    const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson';
    fetch(baseURL)
        .then((r) => r.json())
        .then((r) => {
            console.log("printing");
            console.log(r);
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


/*for (var i=0;i<30;i++)
{
    var mark=data[i];
    console.log(data.location);
}*/
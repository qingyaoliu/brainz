const express = require('express'); 

//Neues Express Objekt
var app = express();
app.get('/', function(req,res) {
    res.send("Hallo aus Express");
});

app.listen(3000);
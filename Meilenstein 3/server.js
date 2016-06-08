var express = require('express');
var app = express();
var fs=require('fs');

app.get('/home', function (req, res) {
    res.send('Hello Home!');
});

app.get('/api/players',(req,res) =>{
    fs.readFile('./players.json','utf-8',(err,data)=>{
    console.log(data);
res.send(data);
})
})

app.get('/api/players/fav',(req,res) =>{
   var json= JSON.parse(fs.readFileSync('./players.json','utf8'));
    json.
    res.send(json);
})

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
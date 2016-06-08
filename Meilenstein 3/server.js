const express = require('express');
const app = express();
const fs=require('fs');

app.get('/api/players',(req,res) =>{
    fs.readFile('./players.json','utf-8',(err,data)=>{
    console.log('Got all Players');
    res.send(data);
})
})

app.get('/api/players/fav',(req,res) =>{
    var json= JSON.parse(fs.readFileSync('./players.json','utf8'));
    var array= [];
    for(var x in json){
        array.push(json[x]);
    }
    var arrayfil=array.filter(function(el){
        return (el.favorit===true);
    })
    console.log(arrayfil)
    res.send(array);
})

function checkFav(value){
    return 'favorit: true';
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
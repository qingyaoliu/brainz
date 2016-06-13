const express = require('express');
const app = express();

var players = require('./players.json');

app.use((req, res, next)=> {
    res.header('Content-Type', 'application/json');
    next();
});

/* Als erstes Favoriten, dann die suche und dann alle ausgegeben */
app.route('/api/players').get((req, res)=> {
    var json = 0;
    if (req.query.favorites === 'true') {
        json = players.filter((x)=> {
            return x.favorit === true;
        });
        res.send(json);
    } else if (req.query.search) {
        json = players.filter((x)=> {
            return x.name.charAt(0).toLowerCase() === req.query.search.toLowerCase();
        });
        res.send(json);
    } else {
        res.send(players);
    }
});
app.route('/api/players').post((req, res)=> {
    res.json({
        message: 'Spieler wurde erfolgreich gespeichert'
    });
});

app.route('/api/players/:id').put((req, res)=> {
    res.json({
        message: 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet'
    });
});
app.route('/api/players/:id').delete((req, res)=> {
    var removedPlayer = false;
    for (var i in players) {
        if (req.params.id === players[i]._id) {
            players.splice(i, 1);
            removedPlayer = true;
        }
    }
    if (removedPlayer === true) {
        res.json({message: 'Spieler:' + req.params.id + ' wurde erfolgreich gelöscht'})
    } else {
        res.json({message: 'Spieler:' + req.params.id + ' wurde nicht gefunden'})
    }
});

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000!');
});
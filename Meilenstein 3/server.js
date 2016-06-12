const express = require('express');
const app = express();

var players = require('./players.json');

app.use((req, res, next)=> {
    res.header('Content-Type', 'application/json');
    next();
});

app.route('/api/players')
    .get((req, res)=> {
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
            console.log(players);
            res.send(players);
        }
    })
    .post((req, res)=> {
        res.json('Player saved');
    });

app.route('/api/players/:id')
    .put((req, res)=> {
        res.json({
            message: 'Player update'
        });
    })
    .delete((req, res)=> {
        for (var i; players.lenght; i++) {
            if (req.params.id === players[i].id) {
                players.splice(i, 1);

            }
        }
        res.json({message: 'removed'})
    });

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000!');
});
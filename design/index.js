function validateLetters(letter) {
    var objRegExp = /^[a-zA-Z]+$/;
    return objRegExp.test(letter);
}

function validateNumbers(number) {
    var objRegExp = /^[0-9]+$/;
    if (number < 4 || number > 15) {
        return false;
    }
    return objRegExp.test(number);
}

function validateYear(year) {
    var objRegExp = /^[0-9]+$/;

    if (year < 1 || year > 2016) {
        return false;
    }
    return objRegExp.test(year);
}


function alertMessage() {
    alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben.")
}

function checkFormular() {

    var error;
    var letters1 = document.player.vorname.value;
    var letters2 = document.player.name.value;
    var letters3 = document.player.verein.value;
    var letters4 = document.player.hcoach.value;
    var letters5 = document.player.acoach.value;

    if ((!validateLetters(letters1)) || (!validateLetters(letters2)) || (!validateLetters(letters3)) || (!validateLetters(letters4)) || (!validateLetters(letters5))) {
        error = true;
    }

    var number = document.player.number.value;
    if (!validateNumbers(number)) {
        error = true;
    }

    var gebJahr = document.getElementById('gebJahr').value;
    if (!validateYear(gebJahr)) {
        error = true;
    }

    if (error) {
        event.preventDefault();
        alertMessage();
        return false;
    } else {
        return true;
    }
}

function sendForm(event) {

    var checked = checkFormular(event);
    if (checked) {

        var formData = new FormData(document.forms.namedItem("player"));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', ' http://139.59.134.26/api/players', true);
        xhr.onload = function (e) {

        };

        xhr.send(formData);
    }
}

function getPlayers(favorites) {
    var xhr = new XMLHttpRequest();
    if (favorites) {
        xhr.open('GET', "http://139.59.134.26/api/players?favorites=true", true);
    } else {
        xhr.open('GET', "http://139.59.134.26/api/players", true);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
        }
        createTable(xhr.responseText);
    }
    xhr.send();
}

function createTable(response) {
    clearTable();
    var tr, td;
    var tbody = document.getElementById("data");
    var array = JSON.parse(response);
    for (var i = 0; i < array.length; i++) {
        tr = tbody.insertRow(tbody.rows.length);
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].vorname + ", " + array[i].name;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].club;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].coach;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].position;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].number;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = array[i].year;

    }
}

function clearTable() {
    document.getElementById("data").innerHTML = "";
}

function activeClass() {
    var selektor, tableheader, changeactive;

    selektor = '.test th';
    tableheader = document.querySelectorAll(selektor);
    changeactive = function () {
        for (var i = 0; i < tableheader.length; i++)
            tableheader[i].classList.remove('active');
        this.classList.add('active');
    };
    for (var i = 0; i < tableheader.length; i++) {
        tableheader[i].addEventListener('mousedown', changeactive);
    }
    if (tableheader[1].className === 'active') {
        getPlayers(true);
    }
    if (tableheader[0].className === 'active') {
        getPlayers(false);
    }


}

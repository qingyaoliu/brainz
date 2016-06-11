//Verbindung zum WebSocket Server wird hergestellt
const socket = io.connect();

socket.on('chat', function (data) {
    $('#content').append(
        // Name
            $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
            // Text
            $('<span>').text(data.text))
    
    // nach unten scrollen
    $('body').scrollTop($('body')[0].scrollHeight);
});

// Nachricht senden
    function senden(){
        // Eingabefelder auslesen
        var name = $('#user_eingabe').val();
        var text = $('#messages').val();
        // Socket senden
        socket.emit('chat', { name: name, text: text });
        // Text-Eingabe leeren
        $('#messages').val('');
    }
    // bei einem Klick
    $('#senden').click(senden);
    // oder mit der Enter-Taste
    $('#messages').keypress(function (e) {
        if (e.which == 13) {
            senden();
        }
    });
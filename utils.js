const socket = new WebSocket('wss://warspixels.com/ics');

socket.addEventListener('open', function (event) {
    socket.send('Coucou le serveur !');
});

// Écouter les messages
socket.addEventListener('message', function (event) {
    console.log('Voici un message du serveur', event.data);
});
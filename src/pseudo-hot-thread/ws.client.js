export const socket = new WebSocket('wss://echo.websocket.org');

let counter = 0;

socket.addEventListener('open', (event) => {
    console.log('Connected to the echo server');
    setInterval(() => {
        socket.send(counter)
        counter++
    }, 1000)
});
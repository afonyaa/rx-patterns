import { socket } from "./ws.client.js";

const { Observable } = rxjs;


// холодный поток, замаскированный под горячий
const wsStream$ = new Observable((subscriber) => {
    const messageListener = (event) => {
        subscriber.next(event.data)
    }
    const closeListener = (event) => {
        subscriber.complete()
    }
    const errorListener = (event) => {
        subscriber.error(event)
    }

    socket.addEventListener('message', messageListener);
    socket.addEventListener('close', closeListener)
    socket.addEventListener('error', errorListener)

    return () => {
        socket.removeEventListener('message', messageListener)
        socket.removeEventListener('close', closeListener)
        socket.removeEventListener('error', errorListener)
    }
})

wsStream$.subscribe({
    next: (data) => {
        console.log('SUB1:', data)
    }
})

setTimeout(() => {
    wsStream$.subscribe({
        next: (data) => {
            console.log('SUB2:', data)
        }
    })
}, 10000)
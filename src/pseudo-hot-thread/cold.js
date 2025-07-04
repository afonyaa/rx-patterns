import { Observable } from "rxjs";

// cold
const stream$ = new Observable((subscriber) => {
    let counter = 0
    console.log('start, when someone subscribed')
    const intervalId = setInterval(() => {
        counter++
        subscriber.next(counter)
        if (counter === 3) {
            subscriber.complete()
        }
    }, 1000)

    return () => {
        clearInterval(intervalId)
    }
})


// const subscription = stream$.subscribe({
//     next: (val) => { console.log(val) },
//     error: (err) => { console.log(err) },
//     complete: () => { console.log('Complete') },
// })
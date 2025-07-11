import { interval, Observable, filter } from "rxjs";

const stream$ = interval(1000)

// rxjs Operator
const filterCustom = (filterFn) => {
    return (source$) => new Observable((subscriber) => {
        const subscription = source$.subscribe({
            next: (val) => {
                filterFn(val) ? subscriber.next(val) : null
            },
            complete() {
                subscriber.complete()
            },
            error: (error) => subscriber.error(error),
        })

        // return () => {
        //     subscription.unsubscribe()
        // }
        return subscription
    })
}

const subscription = filter(isEven)(stream$).subscribe({
    next: (val) => { console.log(val) },
    complete: () => { console.log('close') },
    error: () => { }
})

setTimeout(() => { subscription.unsubscribe() }, 5000)

function isEven(n) {
    return n % 2 === 0;
}
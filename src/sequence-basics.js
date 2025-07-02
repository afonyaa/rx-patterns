import { Observable } from 'rxjs'

// promises do not fit

/**
const seqeunce = () => {
    let counter = 0
    return new Promise((res, rej) => {
        setInterval(() => {
            console.log('res:', counter)
            res(counter)
            counter++
        }, 1000)
    })
}



seqeunce().then((val) => {
    console.log(val)
})
*/

// generators

/**
function* iteratorFn() {
    let index = 0;
    while (true) {
        index = index + 1
        yield index;
    }
}

var sequence = iteratorFn();


setInterval(() => {
    console.log(sequence.next())
}, 1000)
 */

// reactive x

// на конце всего 
// что возвращает observable - ставится доллар
const stream$ = new Observable((subscriber) => {
    let counter = 0
    console.log('start, when someone subscribed')
    const intervalId = setInterval(() => {
        counter++
        console.log('counter:', counter)
        subscriber.next(counter)
        if (counter === 3) {
            subscriber.complete()
        }
    }, 1000)

    return () => {
        clearInterval(intervalId)
    }
})

const subscription = stream$.subscribe({
    next: (val) => { console.log(val) },
    error: (err) => { console.log(err) },
    complete: () => { console.log('Complete') },
})


setTimeout(() => subscription.unsubscribe(), 2500)
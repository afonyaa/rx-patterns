import { interval, take } from "rxjs";

// -0-1-2-3-4-5-6-7-8-....
const thread$ = interval(1000)

// thread$.subscribe((val) => {
//     console.log(val)
// })

thread$.pipe(take(2)).subscribe({
    next(val) {
        console.log(val)
    },
    complete() {
        console.log('complete')
    }
})
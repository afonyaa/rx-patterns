import { from, interval, of, timer } from "rxjs"
import { ajax } from "rxjs/ajax"

const myInterval$ = interval(1000)

myInterval$.subscribe({
    next: (data => {
        // console.log(data)
    })
})

const timer$ = timer(1000, 3000)

const dataList$ = of(1, 2, 3, 4, [1, 2], { a: 5 })

// dataList$.subscribe({
//     next(data) {
//         console.log(data)
//     }
// })


from([1, 2, 4, 5, [1, 2], { a: 4 }])

ajax({

}).subscribe({
    next() { }
})

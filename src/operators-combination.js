import { filter, interval, map } from "rxjs";

const stream$ = interval(1000)

const filterEven = filter(isEven)
const double = map(doubleFn)


// double(filterEven(stream$)).subscribe((val) => {
//     console.log(val)
// })


function isEven(n) {
    return n % 2 === 0;
}

function doubleFn(n) {
    return n * 2
}

function pipe(...operators) {
    return (source$) => {
        return operators.reduce((prev, oper) => oper(prev), source$)
    }
}

const pipedSequentially = pipe(filterEven, double)
// pipedSequentially(stream$).subscribe(val => {
//     console.log('piped', val)
// })

stream$.pipe(filterEven, double).subscribe(val => {
    console.log(val)
})

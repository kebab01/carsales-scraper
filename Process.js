
import carData from './carData.json'

export function processData(cars){

    cars = cars.map((car) =>{ //Cleans data for processing
        car.odometer = car.odometer != null? parseInt(car.odometer.replace(',', '').replace(' km','')) : 0
        car.price = car.price != null? parseInt(car.price.replace('$','').replace('*','').replace(',','').replace(' ','')) : 0
        return car
    })
    // cars = carData

    cars = calcMarketValue(cars)
    // cars.map((car)=>{
    //     console.log(car['odometer'], car['price'])
    // })
    return cars
}

export function calcMarketValue(cars){

    const [m, b] = calcConsts(cars)

    cars = cars.map((car)=>{

        car['market_value'] = (m*car['odometer'] + b).toFixed(2)
        return car
    })
    return cars
    
}
function calcConsts(cars){

    // Calculates m constant and b constant

    let x = cars.map((car)=>car.odometer)
    let y = cars.map((car)=>car.price)

    let x_mean = x.reduce((a,b)=>a+b,0)/x.length
    let y_mean = y.reduce((a,b) => a+b,0)/y.length

    let sum1 = 0
    let sum2 = 0

    for (let val in x){
        const x_val = x[val]
        const y_val = y[val]

        sum1 += (x_val-x_mean)*(y_val-y_mean)
        sum2 += (x_val-x_mean)**2
    }

    const m = sum1/sum2
    const b = y_mean-m*x_mean

    console.log("Constants are", m, b)
    return [m,b]
}
export function calcMedian(cars){
    console.log('calc median')
    let prices = cars.map((car)=>{
        return car['price']
    })
    
    const index = prices.length/2 -1
    const median = prices.sort((a, b) => a - b)[index]
    console.log(median)
}
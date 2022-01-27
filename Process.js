
export function cleanData(cars){

    cars = cars.map((car) =>{
        car.odometer = car.odometer != null? parseInt(car.odometer.replace(',', '').replace(' km','')) : 0
        car.price = car.price != null? parseInt(car.price.replace('$','').replace('*','').replace(',','').replace(' ','')) : 0
        return car
    })

    calcMedian(cars)
}

export function calcMean(cars){
    console.log('calc mean')
    const prices = cars.map((car)=>{
        return car['price']
    })
    const mean = prices.reduce((a, b) => a + b, 0)/prices.length
    console.log('Mean Price:', mean)
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
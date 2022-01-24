import {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
const cheerio = require('react-native-cheerio');

export default function App() {

  const headers = {}
  headers["authority"] = "www.carsales.com.au"
  headers["upgrade-insecure-requests"] = "1"
  headers["user-agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"
  headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
  headers["sec-gpc"] = "1"
  headers["sec-fetch-site"] = "same-origin"
  headers["sec-fetch-mode"] = "navigate"
  headers["sec-fetch-user"] = "?1"
  headers["sec-fetch-dest"] = "document"
  headers["referer"] = "https://www.carsales.com.au/"
  headers["accept-language"] = "en-GB,en-US;q=0.9,en;q=0.8"

  useEffect(() =>{
    request()
  })

  const [content, setContent] = useState()
  const cars = []
  const BASE_URL = "https://www.carsales.com.au/"

  const getCarDetails = (soup) =>{
    
    let $ = cheerio.load(soup)
    let link = $('a[class="js-encode-search"]').attr('href')
    let name = $('a[class="js-encode-search"]').html()
    let odometer = $('li[data-type="Odometer"]').html()
    let body = $('li[data-type="Body Style"]').html()
    let transmission = $('li[data-type="Transmission"]').html()
    let engine = $('li[data-type="Engine"]').html()
    let price = $('a[data-webm-clickvalue="sv-price"]').text()
    
    return {
      link:link,
      name:name,
      odometer:odometer,
      body:body,
      transmission:transmission,
      engine:engine,
      price:price
    }
  }

  const parsePage = async(response) =>{
    //Recursive method for getting every car on every page and adding it to car array

    let $ = cheerio.load(response);
    
    const title = $('h1[class=title]').html()
    let container = $('div[class=container]').html()
    $ = cheerio.load(container);

    $('div[class="listing-item card showcase "]').each(function(i, elm) {
      let result = $(this).html()
      const car = getCarDetails(result)
      cars.push(car)
    });

    $('div[class="listing-item card topspot "]').each(function(i, elm) {
      let result = $(this).html()
      const car = getCarDetails(result)
      cars.push(car)
    });

    $('div[class="listing-item card standard "]').each(function(i, elm) {
      let result = $(this).html()
      const car = getCarDetails(result)
      cars.push(car)
    });

    let next = $('a[class="page-link next "]').attr('href')

    if (next == null) return
    try{
        console.log('requeesting next page', next)
        response = await fetch(BASE_URL + next,{
        method:'GET',
        headers:headers
        }).then((response) => response.text())

        await parsePage(response)

    }catch(error){
      console.log('in main', error)
    }
    return
  }

  const request = async() =>{

    console.log('requesting')
    let url = BASE_URL + 'cars/audi/a1/new-south-wales-state/'

    let response = await fetch(url,{
      method:'GET',
      headers:headers
    }).then((response) => response.text())
    console.log('response was returned')
    
    await parsePage(response)
    console.log(cars.length)
  }

  return (
    <View style={styles.container}>
      <Text>this</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

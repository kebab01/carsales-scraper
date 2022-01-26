import React from 'react';
import {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from './styles';
import * as Progress from 'react-native-progress';

const cheerio = require('react-native-cheerio');

const STATE_ENUMS = {
    ALL:null,
    NSW:'new-south-wales-state',
    ACT:'australian-capital-territory',
    NT:'northern-territory-state',
    QLD:'queensland-state',
    SA:'south-australia-state',
    TA:'tasmania-state',
    VIC:'victoria-state',
    WA:'western-australia-state'
}

const HEADERS = {
    "authority":"www.carsales.com.au",
    "upgrade-insecure-requests":"1",
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-gpc":"1",
    "sec-fetch-site":"same-origin",
    "sec-fetch-mode":"navigate",
    "sec-fetch-user":"?1",
    "sec-fetch-dest":"document",
    "referer":"https://www.carsales.com.au/",
    "accept-language":"en-GB,en-US;q=0.9,en;q=0.8"     
}
export default function Home() {

    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [body_types, setBodyTypes] = useState([])
    const [availableCars, setAvailableCars] = useState([])

    const [selectBrand, changeSelectBrand] = useState("")
    const [selectModel, changeSelectModel] = useState("")
    const [selectState, changeselectState] = useState("")
    const [selectBodyType, changeselectBodyType] = useState("")

    const [searchPressed, changePressed] = useState(false)
    const [progress, changeProgress] = useState(0)

    useEffect(() =>{
        // request()
        getOptions()
    },[selectBrand])

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

    const parsePage = async(response, numResults) =>{
        //Recursive method for getting every car on every page and adding it to car array

        let $ = cheerio.load(response);

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

        changePressed(cars.length/numResults)
        
        let next = $('a[class="page-link next "]').attr('href')

        if (next == null) return
        try{
            console.log('requeesting next page', next)
            response = await fetch(BASE_URL + next,{
            method:'GET',
            headers:HEADERS
            }).then((response) => response.text())

            await parsePage(response)

        }catch(error){
        console.log('in main', error)
        }
        return
    }

    const constructURL = (requestObj) =>{

        let range = ""
        let url = ""

        if (requestObj.brand != "") url += `${requestObj.brand}/`
        if (requestObj.model != "") url += `${requestObj.model}/`
        if (requestObj.state != null) url += `${requestObj.state}/`
        if (requestObj.body_type != "") url += `${requestObj.body_type}/`


        //Format price range part of url
        if (requestObj.min != undefined && requestObj.max != undefined){
            range = `between-${requestObj.min}-${requestObj.max}`
        }
        else if(requestObj.min == undefined && requestObj.max == undefined){

        }
        else if (requestObj.min == undefined){
            range = `under-${requestObj.max}`
        }
        else if(requestObj.max == undefined){
            range = `over-${requestObj.min}`
        }

        return `${BASE_URL}cars/${url}${range}`

    }
    const request = async(requestObj) =>{

        let url = constructURL(requestObj)
        console.log(url)

        console.log("contructed url", url)
        let response = await fetch(url,{
        method:'GET',
        headers:HEADERS
        }).then((response) => response.text())
        console.log('response was returned')
        
        let $ = cheerio.load(response);

        const numResults = $('h1[class=title]').html().split(' ')[0]
        console.log(`There are ${numResults} cars to process`)
        
        await parsePage(response, numResults)
    }

    const getOptions = async() =>{

        console.log('getting models for', selectBrand)
        
        const car = selectBrand != "" ? `"Make.${selectBrand}."`: `""`
        const expression = `{"expression":${car}}`

        let postHeaders = HEADERS
        postHeaders['content-type'] = 'application/json'

        let response = await fetch('https://www.carsales.com.au/_homepage/v1/search/?tenantName=carsales',{
            method:'POST',
            headers:postHeaders,
            body: expression
        }).then((response) => response.json())
        
        let tmpBrands = response['primaryFields'][0]['values'].map((car) => car['displayValue'])
        tmpBrands = [...new Set(tmpBrands)]
        tmpBrands = tmpBrands.sort()
        tmpBrands.splice(tmpBrands.indexOf(undefined,1))
        setBrands(tmpBrands)
        
        let tmpModels = response['primaryFields'][1]['values'].map((car) => car['displayValue'])
        tmpModels = [...new Set(tmpModels)]
        tmpModels = tmpModels.sort()
        tmpModels.splice(tmpModels.indexOf(undefined,1))
        setModels(tmpModels)

        setBodyTypes(response['secondaryFields'][1]['values'].map((car) => car['displayValue']))
        setAvailableCars(response['searchButtonText'].split(' ')[2])

    }

    const handlePress = () =>{
        changePressed(true)

        const reqObj = {
            brand:selectBrand.replace(' ','-'),
            model:selectModel.replace(' ','-'),
            state:STATE_ENUMS[selectState],
            body_type:selectBodyType.replace(' ','-')
        }
        console.log(reqObj)
        request(reqObj)
    }
  return (
    <SafeAreaView style={{padding:10}}>
        <View style={{width:'100%', alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold', paddingTop:20}}>Carsales Comparision</Text>
        </View>

        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', height:'20%'}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', padding:10, fontSize:20}}>Brand</Text>
            </View>
            <Picker style={{flex:1}}
                selectedValue={selectBrand != ""? selectBrand:brands[0]}
                onValueChange={(itemValue, itemIndex) =>
                    changeSelectBrand(itemValue)
                }>
                {brands.map((brand)=> <Picker.Item key={brand} label={brand} value={brand} />)}
            </Picker>   
        </View>


        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',  height:'20%'}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', padding:10, fontSize:20}}>Model</Text>
            </View>
            <Picker style={{flex:1}}
                selectedValue={selectModel != ""? selectModel : 0}
                onValueChange={(itemValue, itemIndex) =>
                    changeSelectModel(itemValue)
                }>
                {models.map((model)=> <Picker.Item key={model} label={model} value={model} />)}
            </Picker>   
        </View>
        
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',  height:'20%'}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', padding:10, fontSize:20}}>Body Type</Text>
            </View>
            <Picker style={{flex:1}}
                selectedValue={selectBodyType}
                onValueChange={(itemValue, itemIndex) =>
                    changeselectBodyType(itemValue)
                }>
                {body_types.map((type)=> <Picker.Item key={type} label={type} value={type} />)}
            </Picker>   
        </View>

        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',  height:'20%'}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', padding:10, fontSize:20}}>State</Text>
            </View>
            <Picker style={{flex:1}}
                selectedValue={selectState}
                onValueChange={(itemValue, itemIndex) =>
                    changeselectState(itemValue)
                }>
                {Object.keys(STATE_ENUMS).map((state)=> <Picker.Item key={state} label={state} value={state} />)}
            </Picker>   
        </View>

        <View style={{alignItems:'center', padding:20, height:100}}>

            {!searchPressed? 
                <>
                    <Text style={{paddingBottom:10}}>{availableCars} available {selectBrand}'s</Text>

                    <Pressable style={[globalStyles.blueButton, styles.button]} onPress={handlePress}>
                        <Text style={globalStyles.blueButtonText}>Compare</Text>
                    </Pressable>
                </>
            :
            <Progress.Bar progress={progress} width={300} color='#07b524'/>
            }
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    button:{
        width:'80%',
        height:50
    }
});

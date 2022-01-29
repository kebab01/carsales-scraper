import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import globalStyles from '../styles';
import carData from '../carData.json'
import { processData } from '../Process';

export default function Results({route, navigation}) {

    // const data = carData
    const data = route.params?.data
    // const reqObj={
    //     "body_type": "Hatch-bodystyle",
    //     "brand": "Audi",
    //     "model": "A1",
    //     "state": "new-south-wales-state",
    // }

    useEffect(() =>{

        getTop10()
    })

    const getTop10 = () =>{
        let cars = data.sort((a,b) => a['market_value']-b['market_value'], 0)
        console.log(cars)

    }
  return (
    <SafeAreaView style={globalStyles.screen}>
        <ScrollView>

            <Text style={styles.title}>Recommended</Text>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        paddingTop:10
    },
    view:{
        paddingTop:5,
    }
});

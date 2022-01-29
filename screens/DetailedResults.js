import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import carData from "../carData.json";
import globalStyles from "../styles";

export default function Results({ route, navigation }) {

    const data = carData
    const reqObj={
        "body_type": "Hatch-bodystyle",
        "brand": "Audi",
        "model": "A1",
        "state": "new-south-wales-state",
    }

    const SearchParams = () =>{

        return <>
            <Text>Brand: {reqObj['brand'] != null?reqObj['brand']:'None'}</Text>
            <Text>Model: {reqObj['model'] != null? reqObj['model']: 'None'}</Text>
            <Text>Body Style: {reqObj['body_type'] != null ? reqObj['body_type']: 'None'}</Text>
            <Text>State: {reqObj['state'] != null ? reqObj['state'] : 'None'}</Text>

        </>
    }
  return (
    <SafeAreaView style={globalStyles.screen}>
        <ScrollView>

            <Text style={styles.title}>Search Parameters</Text>
            <View style={styles.view}>
                <SearchParams/>
            </View>
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

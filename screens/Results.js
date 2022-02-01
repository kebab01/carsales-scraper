import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList,Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles';
import { getBest, processData } from '../Process';
import Card from '../shared/Card';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Results({route, navigation}) {

    const data = route.params?.data
    const [bestCars, setBest] = useState([])

    useEffect(() =>{
        const cars = getBest(data)
        setBest(cars)
    },[])

    const format = (item) =>{
        return item.toLocaleString()
    }
    const renderItem = ({item}) =>{
        return(
                <Card>
                    <Text style={{fontWeight:'bold', paddingBottom:15, fontSize:17}}>{item.name}</Text>
                    <Image source={{uri:item.img}} style ={{width:'100%', height:200}}resizeMode='contain'/>

                    <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid style={{padding:10}}>
                        <Col>
                            <Row>
                                <Text style={[styles.text, styles.itemTitle]}>Asking Price:</Text>
                            </Row>
                            <Row>
                                <Text style={[styles.text, styles.itemTitle]}>Market Value:</Text>
                            </Row>
                            <Row>
                                <Text style={[styles.text, styles.itemTitle]}>Odometer:</Text>
                            </Row>
                            <Row>
                                <Text style={[styles.text, styles.itemTitle]}>Incl. Govt. Charges:</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Text style={[styles.text, {color:item.price<item.market_value?'green':'red'}]}>${format(item.price)}</Text>
                            </Row>
                            <Row>
                                <Text style={styles.text}>${format(item.market_value)}</Text>
                            </Row>
                            <Row>
                                <Text style={styles.text}>{format(item.odometer)}km</Text>
                            </Row>
                            <Row>
                                <Text style={styles.text}>{item.incl_charges}</Text>
                            </Row>
                        </Col>
                    </Grid>
                    </View>
                    <TouchableOpacity style={[globalStyles.blueButton, styles.button]} onPress={() => Linking.openURL('https://www.carsales.com.au'+item.link)}>
                        <Text style={styles.buttonText}>View on Carsales</Text>
                    </TouchableOpacity>
                </Card>
        )
    }    
  return (
    <View style={[globalStyles.screen, {padding:10}]}>
        <View style={{flex:0.07, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Text style={styles.title}>Recommended</Text>
        </View>
        <View style={{width:'100%', flex:1}}>
            <FlatList
            data={bestCars}
            renderItem={(item) =>renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            /> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    view:{
        paddingTop:5,
    },
    text:{
        width:'100%',
        textAlign:'center',
        padding:3
    },
    itemTitle:{
        fontWeight:'bold'
    },
    button:{
        paddingTop:10,
        height:46,
        alignSelf:'center',
        width:'80%',
        alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        color:'white'
    }
});

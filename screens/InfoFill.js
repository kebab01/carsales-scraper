import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Card from '../shared/Card';

export default function InfoFill({route, navigation}) {


    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params?.title
        });
    },[navigation])

    const handlePress = (item) =>{

        let data = route.params.currentObj == undefined || route.params.var == 'brand' ? {} : route.params.currentObj
        data[route.params?.var] = item == 'ALL' ? undefined:item
        navigation.navigate('BuyScreen', data)
    }
    const renderItem = ({item}) =>{
        return(
            <View style={{width:'100%'}}>
                <TouchableOpacity style={{paddingRight:5, paddingLeft:5,}} onPress={() => handlePress(item)}>
                    <Card>
                        <View style={{height:25, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>{item}</Text>
                            {route.params?.currentObj? route.params.currentObj[route.params.var] == item? <View style={{backgroundColor:'#128cde', width:15, height:5, paddingLeft:10}}/>:<View></View>:<View/>}
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>

        );
    }
  return (
    <View style={{paddingTop:10}}>
      <FlatList
        data={route.params.data}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

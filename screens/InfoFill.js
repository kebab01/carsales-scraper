import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Card from '../shared/Card';

export default function InfoFill({route, navigation}) {
    console.log(route.params)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params?.title
        });
    },[navigation])

    const handlePress = (item) =>{
        data = route.params.currentObj == undefined || route.params.var == 'brand' ? {} : route.params.currentObj
        data[route.params?.var] = item
        navigation.navigate('Home', data)
    }
    const renderItem = ({item}) =>{
        return(
            <TouchableOpacity style={{paddingRight:5, paddingLeft:5}} onPress={() => handlePress(item)}>
                <View style={{width:'100%'}}>
                    <Card>
                        <View style={{height:20}}>
                            <Text>{item}</Text>
                        </View>
                    </Card>
                </View>
            </TouchableOpacity>
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

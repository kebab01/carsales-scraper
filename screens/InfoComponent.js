import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Card from '../shared/Card';

export default function InfoComponent({title, selected}) {

    return (
    <View style={{width:'100%', paddingRight:5, paddingLeft:5}}>
        <Card>
            <View style={{height:30, alignItems:'center', flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', fontSize:15, paddingRight:15}}>{title}</Text><Text style={{fontSize:15}}>{selected}</Text>
                <Image source={require('../assets/arrow.png')} style={{width:20, height:20, position:'absolute', right:10, top:0, bottom:0}}/>
            </View>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({});

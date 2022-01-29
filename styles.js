import React from 'react';
import {StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        width:'100%',
        margin:10
    },
    list: {
        padding: 10,
        width: '100%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    inputWborder:{
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        marginTop:2,
        height:40,
        width:'100%'
    },
    inputWborderSmall:{
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        marginTop:2,
        height:20,
        width:'100%'
    },
    inputInvalid:{
        borderColor:'red'
    },
    inputWOborder:{
        marginTop:2,
        borderRadius:10,
        height:35
    },
    cardUpdated: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'right'
    },
    blueButton:{
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#07b524',
        borderRadius:25,
        justifyContent:'center'
    },
    blueButtonText:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15
    }
    
  });
  
  export default globalStyles;
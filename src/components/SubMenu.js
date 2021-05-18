import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons'
// import { Container } from './styles';

export default class SubMenu extends Component {
    render(){
        return (
            <View style={[styles.container, this.props.style]}>
            <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, styles.menu]}>
            <AntDesign name="plus" size={24} color="#FFF"/>
            </Animated.View>
            </TouchableWithoutFeedback>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      position: 'absolute'
    },
    button:{
        position:'absolute',
        width: 60,
        height: 60,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems:'center',
        shadowRadius: 10,
        shadowColor: '#D3D3D3',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        }
    },
    menu:{
        backgroundColor:'#D3D3D3'
    }
  });
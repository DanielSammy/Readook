import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

// <AntDesign name="plus" size={24} color="#4F8EF7" />

export default class FabButton extends Component {
    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 6,
        }).start();

        this.open = !this.open;
    }

    render(){

        // const cameraStyle = {
        //     transform: [
        //         { scale: this.animation},
        //         {
        //             translateY: this.animation.interpolate({
        //                 inputRange: [0,1],
        //                 outputRange: [0, -80]
        //             })
        //         }
        //     ]
        // }

        const rotation = {
            tranform: [
                {
                    rotate: this.animation.interpolate ({
                        inputRange: [0,1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        }

        return (
            <View style={[styles.container, this.props.style]}>

            <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, styles.submenu]}>    
            </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, styles.submenu]}>    
            </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={this.toggleMenu}>
            <Animated.View style={[styles.button, styles.menu, rotation]}>    
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
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems:'center',
        shadowRadius: 10,
        shadowColor: '#002244',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        }
    },
    menu:{
        backgroundColor:'#002244'
    },
    submenu:{
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#002244',

    }
  });
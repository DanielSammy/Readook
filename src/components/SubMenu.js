import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';

// <AntDesign name="plus" size={24} color="#4F8EF7" />

export default function FabButon (props) {
    const [ valor, setValor ] = useState(0);
    const animation = new Animated.Value(valor)

    function AlterValue() {
        if (valor == 0) {
            setValor(1)
        } else {
            setValor(0)
        }
    }

    const toggleMenu = () => {
        const toValue = valor ? 0 : 1

        Animated.spring(animation, {
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();
        AlterValue()
    }

    {

        const addBook = {
            transform: [
                { scale: animation},
                {
                    translateY: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -60]
                    })
                }
            ]
        }

        const searchBook = {
            transform: [
                { scale: animation},
                {
                    translateY: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -115]
                    })
                }
            ]
        }

        const rotation =  {
            transform: [
                {translateX: animation },
                {
                    rotate: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '45deg'],
                        
                        
                    })
                }
            ]
        }

        return (
            <View style={[styles.container, props.style]}>
            <React.Fragment>
          
            </React.Fragment>
            <TouchableWithoutFeedback onPress={()=> alert ('teste1')}>
            <Animated.View style={[styles.button, styles.submenu, searchBook ]}>    
            <Icon name="search" size={24} color="#FFF" />
            </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={()=> alert ('teste2')}>
            <Animated.View style={[styles.button, styles.submenu, addBook]}>  
            <Icon name="playlist-add" size={24} color="#FFF" />  
            </Animated.View>
            </TouchableWithoutFeedback>
           
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>    
                    <Icon name="add" size={24} color="#FFF" />
                    
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
  })

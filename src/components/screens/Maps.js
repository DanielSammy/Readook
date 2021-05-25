import React, { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Animated} from 'react-native'
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps'
import { FAB } from 'react-native-paper'
import {styleMap} from '../PageStyle'
import {rotation, toggleMenu} from '../SubMenu'




export default function Maps() {
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
           <SafeAreaView style={{flex: 1}}>

          <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: -19.903124854806357,
            longitude:  -44.031166485484455,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <TouchableWithoutFeedback onPress={toggleMenu}>
            
        <FAB
        style={[styleMap.fab, rotation]}
        icon="plus"/>
        </TouchableWithoutFeedback>
            </SafeAreaView>
       )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
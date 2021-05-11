import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
// import Estilo from './components/estilo'

export default () => (
  
  <View>
  <Image source={require('../Img/logo.png')}
  style={img.logo}
  /> 

  </View>
)
const img = StyleSheet.create ({
  logo: {
    width: "100%",
    height: 100, 
    flexGrow: 1,
    resizeMode: 'contain',
  }
})
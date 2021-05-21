import React from 'react'
import FabButton from '../SubMenu';
import { View, StyleSheet } from 'react-native';




export default function Livro(){

  return (
    <View style={styles.container}>
    <FabButton
    style={{ bottom: 75, right: 90}}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
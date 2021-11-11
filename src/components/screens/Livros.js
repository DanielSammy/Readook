import React from 'react'
import FabButton from '../SubMenu';
import { View, StyleSheet } from 'react-native';
import Global from './Global'




export default function Livro({navigation}){
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: Global.lingp ? 'Livros' : "Books",
    });
  }, [navigation, Global.lingp])

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
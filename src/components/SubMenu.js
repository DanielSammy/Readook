import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default class SubMenu extends Component {
    render(){
        return (
            <View style={styles.container}>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      position: 'absolute'
    }
  });
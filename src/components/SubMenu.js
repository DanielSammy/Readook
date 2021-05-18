import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// import { Container } from './styles';

export default class SubMenu extends Component {
    render(){
        return (
            <View style={[styles.container, this.props.style]}>
            <TouchableWithoutFeedback>
                <Text>BOTAO</Text>
            </TouchableWithoutFeedback>
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
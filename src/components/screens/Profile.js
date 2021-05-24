import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { Container} from '../Header/style';
import logo from '../Img/logo1x.png'
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'



export default function Profile() {
   return (
      <Container>
      <Logo source={logo}></Logo>
      <View>
      <Icon name="mail" size={25}>
      </Icon> 
      <Text> danielsammy@spaceinformatica.com.br</Text>
      </View> 
      </Container>
      
   );
 }

const styles = StyleSheet.create({

   text: {
      fontSize: 10,
      
   },
}
)

export const Logo = styled.Image`
   width: 150px;
   height: 150px;
`;

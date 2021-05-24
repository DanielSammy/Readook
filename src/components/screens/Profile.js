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
      <Icon name="mail" size={25}/> 
      <Text style={styles.Perfil}> danielsammy@spaceinformatica.com.br</Text>
      <Icon name="mail" size={25}/> 
      <Text style={styles.Perfil}> danielsammy@spaceinformatica.com.br</Text>
      <Icon name="mail" size={25}/> 
      <Text style={styles.Perfil}> dandanboiolao@spaceinformatica.com.br</Text>
      </View> 
      </Container>
      
   );
 }

export const Logo = styled.Image`
   width: 150px;
   height: 150px;
`;


const styles = StyleSheet.create({
   Perfil:{
      alignItems: 'center',
      right: 0,
      padding: 3,
   }


})
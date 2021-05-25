import React from 'react'
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native'
import { Container} from '../Header/style';
import logo from '../Img/logo1x.png'
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'




export default function Profile() {
   return (
      <SafeAreaView>
         <Container>
      <Logo source={logo}></Logo>
         </Container>
<View>
      <Text style={styles.Perfil}>Email: danielsammy@spaceinformatica.com.br</Text>
      <Icon name="mail" size={25} style={styles.icon}/> 
</View>
<View>
      <Text style={styles.Perfil}>Telefone: (31) 99999-9999</Text>
      <Icon name="phone" size={25} style={styles.icon}/> 
</View>
<View>
      <Text style={styles.Perfil}>Localização: </Text>
      <Icon name="map" size={25} style={styles.icon}/> 
</View>
      </SafeAreaView>      
   );
 }

export const Logo = styled.Image`
   width: 150px;
   height: 150px;

`;


const styles = StyleSheet.create({
   Perfil:{
      left: 0,
      top: 30,
      position: 'relative',
      alignItems: 'flex-start',
      right: 0,
      marginLeft: 30,
      padding: 13,

   },
   icon: {
      padding: 10,
      alignItems:'flex-start',
      top: 30,
         position: 'absolute',
   },
   image: {
      top: 70,
      alignItems: 'center',
      padding: 30,
   }


})
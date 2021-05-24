import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { Container, Top } from '../Header/style';
import logo from '../Img/logo1x.png'
import styled from 'styled-components/native';



export default function Profile() {
   return (
      <Container>
      <Top>
      </Top>
<Logo source={logo}></Logo>
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
`;
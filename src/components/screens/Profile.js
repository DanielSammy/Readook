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
<<<<<<< Updated upstream
<Logo source={logo}></Logo>
=======
<Logo source={logo} size={50}></Logo>
>>>>>>> Stashed changes
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
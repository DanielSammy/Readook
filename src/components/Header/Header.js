import React from 'react'
import { Container, Top, Logo, Title } from './style'
import {StyleSheet} from 'react-native'
import logo from '../Img/logo1x.png'
import { theme } from '../PageStyle'

export default function Header() {
return(
    <Container>
        <Top>
        <Title style={styles.font}>Readook</Title>
        </Top>
        <Logo source={logo}/>
    </Container>
)

}


const styles = StyleSheet.create({
    font:{

       fontWeight: 'bold',
    }
})
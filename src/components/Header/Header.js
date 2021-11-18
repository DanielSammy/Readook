import React from 'react'
import { Container, Top, Logo, Title } from './style'
import {StyleSheet} from 'react-native'
import logo from '../Img/logo3x.png'
import { Appbar } from 'react-native-paper'

export default function Header() {
return(
    <Container>
        <Appbar.Action style={{marginLeft: 'auto'}} icon="dots-vertical" color= '#fff' onPress={() => {}} />
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
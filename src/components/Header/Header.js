import React from 'react'
import { Container, Top, Logo, Title } from './style'
import {StyleSheet} from 'react-native'
import logo from '../Img/logo3x.png'
import { Appbar, Provider, Portal, Modal, Text, Button } from 'react-native-paper'
import Global from '../screens/Global'
import { theme } from '../PageStyle'

export default function Header() {
    const [ lingp, setLing] = React.useState(Global.lingp)
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 30};
    const alterLingp = () => {
        setLing(!lingp)
        Global.lingp = !Global.lingp
     }
return(
        <Provider>
    <Container>

<Portal>
<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
<Text style={{color: '#000', display: 'flex', textAlign: 'center', fontSize: 20, top: -15, fontWeight: 'bold'}}>{lingp ? 'Alterar idioma' : 'Change the language'}</Text>
<Button theme={theme} onPress={alterLingp} color='#002244' style={{marginLeft: 60, marginRight: 60}}>{lingp ? 'English' : 'Português'}</Button>
  <Button onPress={hideModal} color= "#fff"  style={{marginTop: 30, marginLeft: 60, marginRight: 60, backgroundColor: '#002244'}}>{lingp ? "Confirmar" : "Confirm" }</Button>
</Modal>
      </Portal>
        <Appbar.Action style={{marginLeft: 'auto'}} icon="dots-vertical" color= '#fff' onPress={showModal} />
        <Top>
        <Title style={styles.font}>Readook</Title>
        </Top>
        <Logo source={logo}/>
    </Container>
    </Provider>
)

}


const styles = StyleSheet.create({
    font:{

       fontWeight: 'bold',
    }
})
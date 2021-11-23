import React, {useCallback} from 'react'
import { Container, Top, Logo, Title } from './style'
import {StyleSheet} from 'react-native'
import logo from '../Img/logo3x.png'
import { Appbar, Provider, Portal, Modal, Text, Button } from 'react-native-paper'
import Global from '../screens/Global'
import { theme } from '../PageStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Header({lingp, onChangeLingp}) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 30, margin: 30};

     const handleLingChange = useCallback(event => {
        onChangeLingp(!lingp)
        Global.lingp=!lingp
      }, )
return(
  <Provider>
    <Container>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{color: '#000', display: 'flex', textAlign: 'center', fontSize: 20, top: -15, fontWeight: 'bold'}}>{lingp ? 'Alterar idioma' : 'Change the language'}</Text>
            <Button theme={theme} onPress={handleLingChange} color='#002244' style={{marginLeft: 60, marginRight: 60}}>{lingp ? 'English' : 'Português'}</Button>
            <Button onPress={hideModal} color= "#fff"  style={{marginTop: 30, marginLeft: 60, marginRight: 60, backgroundColor: '#002244'}}>{lingp ? "Confirmar" : "Confirm" }</Button>
        </Modal>
      </Portal>
        <Icon name="translate" color="#fff" onPress={showModal} size={35} style={{backgroundColor: '#002244', marginLeft: 'auto', margin: 5}}/>
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
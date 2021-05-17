import React from 'react'
import { Appbar, Modal, Portal, Text, Button, Provider, Avatar} from 'react-native-paper';
import { Platform, SafeAreaView, View } from 'react-native';
import theme from '../PageStyle'


export default function Livro() {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'green',marginTop: 750, marginRight: 80, height: 600, padding: 80};

       return (
           <SafeAreaView>
           <Appbar.Header >
           <Appbar.Action icon="equal" onPress={showModal} />
           <Appbar.Content title="Pesquisa"/>
           <Appbar.Action icon="magnify" onPress={() => {}} />
           </Appbar.Header> 
           <Provider>
           <Portal>
             <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
             <Avatar.Image size={60} style={{backgroundColor:'#3AAA87', left: -59, top: -220}} source={require('../Img/logo1.png')} />
               <Text>Example Modal.  Click outside this area to dismiss.</Text>
             </Modal>
           </Portal>
         </Provider>    
           </SafeAreaView>
           );
        }
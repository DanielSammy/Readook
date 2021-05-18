import React from 'react'
import SubMenu from '../SubMenu';

// import { Appbar, Modal, Portal, Text, Button, Provider, Avatar} from 'react-native-paper';
import { Platform, SafeAreaView, View, StyleSheet, Text } from 'react-native';

// import theme from '../PageStyle'



export default function Livro(){

  return (
    <View style={styles.container}>
    <SubMenu
    style={{ bottom: 80, right: 60}}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})




// export default function Livro() {
//     const [visible, setVisible] = React.useState(false);

//     const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const containerStyle = {backgroundColor: 'green',marginTop: 750, marginRight: 80, height: 600, padding: 80};

//        return (
//            <SafeAreaView>
//            <Appbar.Header >
//            <Appbar.Action icon="equal" onPress={showModal} />
//            <Appbar.Content title="Pesquisa"/>
//            <Appbar.Action icon="magnify" onPress={() => {}} />
//            </Appbar.Header> 
//            <Provider>
//            <Portal>
//              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
//              <Avatar.Image size={60} style={{backgroundColor:'#3AAA87', left: -59, top: -220}} source={require('../Img/logo1.png')} />
//                <Text>Example Modal.  Click outside this area to dismiss.</Text>
//              </Modal>
//            </Portal>
//          </Provider>    
//            </SafeAreaView>
//            );
//         }
import React from 'react'
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import Global from './screens/Global'

const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


export default function ModalIdioma() {
       return (
            <Provider>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text> Alterar Idioma</Text>
                    <Button icon="translate" onPress={alterLingp}>{Global.lingp ? Português : English}</Button>
                </Modal>
              </Portal>
              <Button style={{marginTop: 30}} onPress={showModal}>
                Show
              </Button>
            </Provider>
          );
        };

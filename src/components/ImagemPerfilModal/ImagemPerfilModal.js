import React, { useCallback } from 'react'
import { Image, View } from 'react-native'
import { Portal, Modal, Text, Button, Provider } from 'react-native-paper'
import Global from '../screens/Global'
import { theme } from '../PageStyle'

const ImagemPerfilModal = ({imageUri, visible, onChangeVisible}) => {
  const handleVisibleChange = useCallback(() => {
    onChangeVisible(!visible)
  }, )
  const containerStyle = {backgroundColor: 'white', borderRadius:90};

  return (
    <Provider>
      <Portal>
        <Modal style={{display:'flex',alignItems:'center', zIndex:10,position:'absolute'}} visible={visible} onDismiss={handleVisibleChange} contentContainerStyle={containerStyle}>
          <View style={{display: 'flex', alignItems: 'center', padding:5}}>
            <Image style={{height:300, width:300, borderRadius:90}} source={{uri :`${imageUri}`}}/>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

export default ImagemPerfilModal
import React, { useCallback, useEffect } from 'react'
import { Image, View, BackHandler } from 'react-native'
import { Portal, Modal, Text, Button, Provider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { HeaderTitle } from '@react-navigation/stack'
import Global from '../screens/Global'

const modalTheme = {
  colors: {
    backdrop : 'rgba(0, 172, 134, 0.9)'
  }
}

const ImagemPerfilModal = ({imageUri, visible, onChangeVisible, userName}) => {
  const handleVisibleChange = () => {
    onChangeVisible(!visible)
  }

  const containerStyle = {backgroundColor: 'white', borderRadius:90};
  const navigation = useNavigation();

  return (
    <Provider>
      <Portal>
        <Modal theme={modalTheme} onPress style={{display:'flex',alignItems:'center', zIndex:10,position:'absolute', }} visible={visible} onDismiss={handleVisibleChange} contentContainerStyle={containerStyle}>
          <View onPress={() => console.log('oi')} style={{display: 'flex', alignItems: 'center', padding:5}}>
            <Image style={{height:300, width:300, borderRadius:90}} source={{uri :`${imageUri}`}}/>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

export default ImagemPerfilModal
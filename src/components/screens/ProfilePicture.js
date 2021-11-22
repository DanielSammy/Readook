import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from '@react-navigation/stack'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import Global from './Global';
import {firebase} from '@react-native-firebase/auth'
import {CommonActions, useNavigation } from '@react-navigation/native';

const UploadScreen = ({navigation}) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const navegacao = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: Global.lingp? 'Mudar foto de perfil' : 'Change Profile Picture',
      headerLeft:() => (<View style={{display: 'flex', flexDirection: 'row'}}><HeaderBackButton
        onPress={() => backAction(downloadUrl)}
        title="Info"
        tintColor="#fff"
      />
      </View>
      ),
      
    });
  }, [navigation]);

  const backAction = (downloadUrl) => {
    const actualIndex = navegacao.dangerouslyGetState().index 
    const newIndex = actualIndex - 1
    if (downloadUrl !== null) {
      navigation.state.params.onGoBack(downloadUrl)
    }
     navigation.dispatch(
        CommonActions.reset({
        index: newIndex,
        routes:[
          {name: 'Principal'},
          {name: 'Profile'},
        ], 
      })
      )
    return true;
  };
  
  const converterHoraParaLocal = (data) => {
    const novaData = new Date(data.getTime()+data.getTimezoneOffset()*60*1000)
    const diferenca = data.getTimezoneOffset() / 60
    const horas = data.getHours()
    const dia = data.getDate()
    novaData.setHours(horas - diferenca)
    if (horas >= 21 && horas <= 23) {
      novaData.setDate(dia)
    }
    return novaData
  }
  
  

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('Usuário cancelou Image Picker')
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error)
      } else if (response.customButton) {
        console.log('Usuario clicou em um botão customizado: ', response.customButton)
      } else {
        const source = {uri: response.uri};
        setImage(source)
      }
    })
  }

  const updateUserAvatar = async(valorCampo) =>{
    const informacaoUpdate = {}
    informacaoUpdate.usrCodigo = Global.user.usrCodigo
    informacaoUpdate.nomeCampo = 'usr_avatar'
    informacaoUpdate.valorCampo = `${valorCampo}`
    const response = await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/user/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(informacaoUpdate)
      })
      .then(response => response.json())
    Global.user.usrAvatar = valorCampo
}

  const uploadImage = async () => {
    const { uri } = image;
    const data = converterHoraParaLocal(new Date())
    const stringData = data.toISOString()
    const dataHoraCorreta = stringData.substr(0,stringData.length - 1)
    const dataCorreta = `${dataHoraCorreta.substring(8,10)}-${dataHoraCorreta.substring(5,7)}-${dataHoraCorreta.substring(0,4)}`
    const horaCorreta = `${dataHoraCorreta.substring(11,13)}${dataHoraCorreta.substring(14,16)}${dataHoraCorreta.substring(17,19)}`
    const userFirstName = Global.user.usrNomeCompleto.split(' ',1)[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const fileName = `images/${Global.user.usrCodigo}${userFirstName}profilepic/${dataCorreta}${horaCorreta}`
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    setUploading(true)
    setTransferred(0)

    const task = storage()

      .ref(fileName)
      .putFile(uploadUri,);

      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        )
      });

     task.then(async () => {
       console.log('Image uploaded to the bucket!');
       const mDownloadUrl = await storage()
        .ref(fileName)
        .getDownloadURL();
        console.log(mDownloadUrl)
        await updateUserAvatar(mDownloadUrl)
     })

      try {
        console.log(uri,fileName)
        await task
        Alert.alert(
          'Foto Upada',
          'Sua foto subiu caraaaaai'
        )        
      } catch (err) {
        console.error(err)
      }

      setUploading(false);
      
     

      setImage(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6'
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});

export default UploadScreen
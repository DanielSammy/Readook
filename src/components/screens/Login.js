import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {  SafeAreaView, View } from 'react-native'
import { Avatar, Card, TextInput, Button, Appbar, Portal, Provider, Modal, Text, } from 'react-native-paper'
import { loginStyle, telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'
import Global from './Global'
import PushNotification from 'react-native-push-notification'
import { ThemeColors } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export const LoginScreen = (props) =>{
   const [ email, setEmail ] = useState('')
   const [ senha, setSenha ] = useState('')
   const [ secureText, setSecureText ] = useState(true)
   const [ lingp, setLing] = useState(true)

   const createChannels = () => {
      PushNotification.createChannel({
         channelId: 'readook-channel',
         channelName: 'Readook Channel'
      })
   }

   const alterLingp = () => {
      setLing(!lingp)
      Global.lingp = !lingp
   }

   const Principal =() => props.navigation.navigate("Principal")  
   const Cadastro = () => props.navigation.navigate("Cadastro")
   
   const login = async (emailLogin, senhaLogin) => {
      const alert = {}
      if (Global.lingp) {
         alert.title = 'Dados inválidos'
      } else {
         alert.title = 'Invalid Data'
      }
      if (emailLogin.length === 0 || !emailLogin.match(/@[a-z0-9]+\.[a-z0-9]+/i) ) {
         if (Global.lingp) {
            alert.message = 'Digite um email válido'
         } else {
            alert.message = 'Enter a valid email'
         }
         Alert.alert(alert.title,alert.message)
         return ''
      }
      if (senhaLogin.length === 0) {
         if (Global.lingp) {
            alert.message = 'Digite uma senha'
         } else {
            alert.message = 'Enter a valid password'
         }
         Alert.alert(alert.title,alert.message)
         return ''
      }
      const results = await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/usuario/'${emailLogin}'`)
      .then(response => response.json())
      .catch(err => {
         const error = {}
         if (Global.lingp) {
            error.title = 'Erro de conexão'
            error.message = 'Falha na requisição'  
         } else {
            error.title = 'Connection error'
            error.message = err.message
         }
         Alert.alert(error.title,error.message)
      })
      if (results.length == 0) {
         if (Global.lingp) {
            alert.message = 'Usuário não existe'
         } else {
            alert.message = 'User does not exist'
         }
         Alert.alert(alert.title,alert.message)
         return ''
      }
      const usrSenha = results[0].usr_senha
      if (usrSenha != senhaLogin) {
         if (Global.lingp) {
            alert.message = 'Senha inválida'
         } else {
            alert.message = 'Invalid Password'
         }
         Alert.alert(alert.title,alert.message)
         return ''
      }
      const usrLogando = {
       usrNomeCompleto : results[0].usr_nomecompleto,
       usrEmail: results[0].usr_email,
       usrCodigo : results[0].usr_codigo,
       usrAvatar : results[0].usr_avatar,
       usrDtnascimento: results[0].usr_dtnascimento, 
       usrCpf: results[0].usr_cpf,
       usrFone: results[0].usr_fone,
      }
      Global.user=usrLogando
      Principal()
   }

   useEffect(() => {
      createChannels();
   }
   )
   const [visible, setVisible] = React.useState(false);
   const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
   const containerStyle = {backgroundColor: 'white', padding: 30};

   return (
      <Provider>

        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    <Text style={{color: '#000', display: 'flex', textAlign: 'center', fontSize: 20, top: -15, fontWeight: 'bold'}}>{lingp ? 'Alterar idioma' : 'Change the language'}</Text>
        <Button theme={theme} onPress={alterLingp} color='#002244' style={{marginLeft: 60, marginRight: 60}}>{Global.lingp ? 'English' : 'Português'}</Button>
          <Button onPress={hideModal} color= "#fff"  style={{marginTop: 30, marginLeft: 60, marginRight: 60, backgroundColor: '#002244'}}>{lingp ? "Confirmar" : "Confirm" }</Button>
  </Modal>
              </Portal>
              <View style={{backgroundColor: '#002244'}}>
            <Icon name="translate" color="#fff" onPress={showModal} size={35} style={{backgroundColor: '#002244', marginLeft: 'auto', right: 10, top: 3}}/>
              </View>
           <SafeAreaView style={loginStyle.content}>
           <View style={loginStyle.view}>
           <Card>
           <Avatar.Image size={75} source={require('../Img/logoR.png')}
           style={loginStyle.avatar}/>
          <Card.Content>
          <TextInput label="Email" onChangeText={email => setEmail(email)} theme={theme} keyboardType="email-address" style={loginStyle.cardLabel}></TextInput>
          <TextInput label={lingp ? "Senha" : "Password"} onChangeText={senha => setSenha(senha)} theme={theme} secureTextEntry={secureText} style={loginStyle.cardLabel} right={<TextInput.Icon onPress={() => setSecureText(!secureText)} name='eye-off-outline' color={telaCadastro.icon.color}/>}></TextInput>
          <Button uppercase={false} theme={theme}>{lingp ? "Recuperar Senha" : "Password Retrieve"}</Button>
          <Button mode="contained" style={loginStyle.cardButton} onPress={() => login(email, senha)}>Login</Button>
          <Button uppercase={false} theme={theme} onPress={Cadastro} >{lingp ? "Cadastre-se" : "Create new account"}</Button>
          </Card.Content>
          </Card>
          </View>
          </SafeAreaView> 
         </Provider>   
       )
    }
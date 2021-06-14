import React, { useState } from 'react'
import {  SafeAreaView, View } from 'react-native'
import { Avatar, Card, TextInput, Button, } from 'react-native-paper'
import { loginStyle, telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'
import Global from './Global'


export const LoginScreen = (props) =>{
   const [ email, setEmail ] = useState('')
   const [ senha, setSenha ] = useState('')

   const Principal =() => props.navigation.navigate("Principal")  
   const Cadastro = () => props.navigation.navigate("Cadastro")
   
   const login = async (email, senha) => {
      const results = await fetch(`http://179.221.167.148:8082/usuario/'${email}'`)
      .then(response => response.json())
      if (results.length == 0) {
         alert('Usuário Não existe')
         return ''
      }
      const usrSenha = results[0].usr_senha
      if (usrSenha != senha) {
         alert('Senha inválida')
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
       return (
           
           <SafeAreaView style={loginStyle.content}>
           <View style={loginStyle.view}>
           <Card>
           <Avatar.Image size={75} source={require('../Img/logoR.png')}
           style={loginStyle.avatar}/>
          <Card.Content>
          <TextInput label="Email" onChangeText={email => setEmail(email)} theme={theme} keyboardType="email-address" style={loginStyle.cardLabel}></TextInput>
          <TextInput label="Senha" onChangeText={senha => setSenha(senha)} theme={theme} secureTextEntry={true} style={loginStyle.cardLabel} right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}></TextInput>
          <Button uppercase={false} theme={theme} >Recuperar Senha</Button>
          <Button mode="contained" style={loginStyle.cardButton} onPress={() => login(email, senha)}>Login</Button>
          <Button uppercase={false} theme={theme} onPress={Cadastro} >Cadastre-se</Button>
          </Card.Content>
          </Card>
          </View>
          </SafeAreaView>    
          
       )
    }

import React from 'react'
import {  SafeAreaView, View } from 'react-native'
import { Avatar, Card, TextInput, Button, } from 'react-native-paper'
import { loginStyle, telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'
import Cadastro from './cadastro'
import Livros from './livros'
import Home from './Principal'

export const LoginScreen = (props) =>{

       return (
           
           <SafeAreaView style={loginStyle.content}>
           <View style={loginStyle.view}>
           <Card>
           <Avatar.Image size={75} source={require('../Img/logo1x.png')}
           style={loginStyle.avatar}/>
          <Card.Content>
          <TextInput label="Email" theme={theme} keyboardType="email-address" style={loginStyle.cardLabel}></TextInput>
          <TextInput label="Senha" theme={theme} secureTextEntry={true} style={loginStyle.cardLabel} right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}></TextInput>
          <Button uppercase={false} theme={theme} >Recuperar Senha</Button>
          <Button mode="contained" style={loginStyle.cardButton} onPress={()=>props.navigation.reset({ index: 0, routes:[{name:"Principal"}]})}>Login</Button>
          <Button uppercase={false} theme={theme} onPress={()=>props.navigation.navigate('cadastro')} >Cadastre-se</Button>
          </Card.Content>
          </Card>
          </View>
          </SafeAreaView>    
          
       )
    }
import React from 'react'
import {  SafeAreaView, View } from 'react-native'
import { Card, TextInput, Button, } from 'react-native-paper'
import { loginStyle } from './Estilo'
import Logomarca from './Img/logomarca'

export const LoginScreen = () =>{

       return (
           
           <SafeAreaView style={loginStyle.content}>
           <View style={loginStyle.view}>
           <Card>
           <Logomarca/>
          <Card.Content>
          <TextInput label="Email" keyboardType="email-address"></TextInput>
          <TextInput label="Senha" secureTextEntry={true}></TextInput>
          <Button uppercase={false}>Recuperar Senha</Button>
          <Button mode="contained">Login</Button>
          <Button>Cadastre-se</Button>
          </Card.Content>
          </Card>
          </View>
          </SafeAreaView>    
          
       )
    }
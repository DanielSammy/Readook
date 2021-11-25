import React, { useState } from 'react'
import {  SafeAreaView, ScrollView, View} from 'react-native'
import {Button, TextInput, Text} from 'react-native-paper'
import TextInputMask from 'react-native-text-input-mask'
import { telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'
import Global from './Global'
import { LoginScreen } from './Login'



export const Cadastro = ({navigation}) => { 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: Global.lingp ? 'Cadastro' : "Registration",
    });
  }, [navigation, Global.lingp])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [cpf, setCpf] = useState('')
    const [fone, setFone] = useState('')
    const [secureTextSenha , setSecureTextSenha ] = useState(true)
    const [secureTextConfirm , setSecureTextConfirm ] = useState(true)
    const [ senhaIgual, setSenhaIgual ] = useState(true)

    const insertUser = async(name, dataNasc, cpf,email,senha,fone) =>{
        const user = {}
        const dataFormat = ''.concat(dataNasc.substr(6,4),'-',dataNasc.substr(3,2),'-',dataNasc.substr(0,2))
        user.name = name
        user.email = email
        user.senha = senha
        user.dataNasc = dataFormat
        user.cpf = cpf
        user.fone = fone
        const response = await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/user/cadastro`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then(response => response.json())
        console.log(response)
}

const verificaConfirmacaoSenha = (confSenha, senha) => {
  if (senha !== confSenha) {
    setSenhaIgual(false)
  } else {
    setSenhaIgual(true)
  }
}

       return (
           <SafeAreaView style={{top: '10%',}} >
                <ScrollView>
                    <View theme={theme} style={telaCadastro.pagcad}>
                    <TextInput label={Global.lingp ? "Nome" : "Name"} onChangeText={name => setName(name)} value={name}theme={theme}/>
                    <TextInput label={Global.lingp ? "Data Nascimento" : "Birthday"} keyboardType="number-pad" onChangeText={ dataNasc => setDataNasc(dataNasc)} value={dataNasc} theme={theme}/>
                    <TextInput label={Global.lingp ?"CPF" : "SSN"} render={props => (Global.lingp ? <TextInputMask {...props} mask="[000].[000].[000]-[00]"/> : <TextInputMask {...props} mask="[000]-[00]-[0000]"/> ) } type={'cpf'} keyboardType="number-pad" onChangeText={ cpf=> setCpf(cpf)} value={cpf} theme={theme}/>
                    <TextInput label="Email"  onChangeText={email => setEmail(email)} value={email} keyboardType="email-address" theme={theme}/>
                    <TextInput label={Global.lingp ? "Senha" : "Password" } onChangeText={senha => setSenha(senha)} value={senha} secureTextEntry={secureTextSenha} theme={theme}  right={<TextInput.Icon onPress={() => setSecureTextSenha(!secureTextSenha)} name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    <TextInput label={Global.lingp ? "Confirmar senha" : "Confirm Password"} onChangeText={(event) => verificaConfirmacaoSenha(event, senha)} secureTextEntry={secureTextConfirm} theme={theme} right={<TextInput.Icon onPress={() => {setSecureTextConfirm(!secureTextConfirm)}} name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    {senhaIgual ? <></> : <Text style={{color:'red'}}>{Global.lingp? "*Senhas não conferem" : "*Passwords don't match"}</Text>}
                    <View style={{display: 'flex', flexDirection:'column', width: '100%'}}>
                    </View>
                    <TextInput label={Global.lingp ? "Telefone" : "Phone Number"} onChangeText={ fone => setFone(fone)} value={fone} keyboardType="phone-pad" theme={theme}/>
                    <Button  mode="contained" onPress={(LoginScreen) => insertUser(name, dataNasc, cpf,email,senha,fone)} style={telaCadastro.button} theme={theme}>{Global.lingp? "Finalizar Cadastro" : "Sign Up"}</Button>
                    </View>
                </ScrollView>
           </SafeAreaView>
       )
}
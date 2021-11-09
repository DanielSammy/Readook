import React, { useState } from 'react'
import {  SafeAreaView, ScrollView, View} from 'react-native'
import {Button, Appbar, TextInput, TextInputMask} from 'react-native-paper'
import { telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'
import Global from './Global'



export const Cadastro = () => { 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [cpf, setCpf] = useState('')
    const [fone, setFone] = useState('')

    const insertUser = async(name, dataNasc, cpf,email,senha,fone) =>{
        const user = {}
        const dataFormat = ''.concat(dataNasc.substr(6,4),'-',dataNasc.substr(3,2),'-',dataNasc.substr(0,2))
        user.name = name
        user.email = email
        user.senha = senha
        user.dataNasc = dataFormat
        user.cpf = cpf
        user.fone = fone
        console.log( JSON.stringify(user))
        const response = await fetch('http://192.168.0.27:8082/user/cadastro', {
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

       return (
           <SafeAreaView style={{top: '20%',}} >
                <ScrollView>
                    <View theme={theme} style={telaCadastro.pagcad}>
                    <TextInput label={Global.lingp ? "Nome" : "Name"} onChangeText={name => setName(name)} value={name}theme={theme}/>
                    <TextInput label="Data Nascimento" keyboardType="number-pad" onChangeText={ dataNasc => setDataNasc(dataNasc)} value={dataNasc} theme={theme}/>
                    <TextInput label="CPF" type={'cpf'} keyboardType="number-pad" onChangeText={ cpf=> setCpf(cpf)} value={cpf} theme={theme}/>
                    <TextInput label="Email"  onChangeText={email => setEmail(email)} value={email} keyboardType="email-address" theme={theme}/>
                    <TextInput label="Senha" onChangeText={senha => setSenha(senha)} value={senha} secureTextEntry={true} theme={theme}  right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    <TextInput label="Confirmar senha" secureTextEntry={true} theme={theme} right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    <TextInput label="Telefone" onChangeText={ fone => setFone(fone)} value={fone} keyboardType="phone-pad" theme={theme}/>
                    <Button  mode="contained" onPress={() => insertUser(name, dataNasc, cpf,email,senha,fone)} style={telaCadastro.button} theme={theme}>Finalizar Cadastro</Button>
                    </View>
                </ScrollView>
           </SafeAreaView>
       )
}
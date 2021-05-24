import React from 'react'
import {  SafeAreaView, ScrollView, View} from 'react-native'
import {Button, Appbar, TextInput} from 'react-native-paper'
import { telaCadastro } from '../Estilo'
import { theme } from '../PageStyle'

export const Cadastro = () => { 
       return (
           <SafeAreaView style={{top: '20%',}} >
                <ScrollView>
                    <View theme={theme} style={telaCadastro.pagcad}>
                    <TextInput label="Name" theme={theme}/>
                    <TextInput label="Email" keyboardType="email-address" theme={theme}/>
                    <TextInput label="Senha" secureTextEntry={true} theme={theme}  right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    <TextInput label="Confirmar senha" secureTextEntry={true} theme={theme} right={<TextInput.Icon name='eye-off-outline' color={telaCadastro.icon.color}/>}/>
                    <TextInput label="Telefone" keyboardType="phone-pad" theme={theme}/>
                    <Button  mode="contained" style={telaCadastro.button} theme={theme}>Finalizar Cadastro</Button>
                    </View>
                </ScrollView>
           </SafeAreaView>
       )
}
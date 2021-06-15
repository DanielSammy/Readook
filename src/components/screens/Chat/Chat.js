import React, { useState, useEffect, useCallback } from 'react'
import { TouchableNativeFeedback } from 'react-native';
import { View, StyleSheet, Alert, SafeAreaView, ScrollView, Image } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { ChatContainer, ContainerImage, ImageContainer, TextContainer } from './styles';
import io from 'socket.io-client'
import Global from '../Global'




const Chat = ({route, navigation}) => {
    const [ chats, setChats ] = useState([])
    const [ onLoad, setOnLoad ] = useState(true)
    const carregaBatePapo = async (usuario) => {
        await fetch(`http://179.221.167.148:8082/chat/${usuario}`)
        .then(response => response.json())
        .then(results => transformChat(results))
    }

    const transformChat = async (conversas) => {
        await conversas.forEach((conversa) => {criaConversa(conversa)})
    }

    const criaConversa = async (conversa) => {
        const newChat = {};
        newChat._id = conversa.cha_codigo
        newChat.ultimaMensagem = conversa.chm_mensagem
        newChat.data = `${conversa.chm_datahora.substring(8,10)}/${conversa.chm_datahora.substring(5,7)}/${conversa.chm_datahora.substring(0,4)}`
        newChat.hora = conversa.chm_datahora.substring(11,16)
        const user = {}
        user._id = conversa.usr_codigo
        user.avatar= conversa.usr_avatar
        user.name= conversa.usr_nomecompleto
        newChat.user = user
        await setChats((prevState) => ([
            ...prevState , 
            newChat]))
      }
      const goToChatMensagem = (chat) => {
        navigation.navigate('ChatMensagem', {
            chatCodigo: chat._id,
            codigoDest: chat.user._id,
            name: chat.user.name,
            avatar: chat.user.avatar})
      }
    
      useEffect(() => {
        if (onLoad) {
            carregaBatePapo(Global.user.usrCodigo);
            setOnLoad(false)
        }
        return () => {
            setChats([])
            setOnLoad(true)
        }
      },[])
    
    return (
        <SafeAreaView style={{backgroundColor: '#daebeb', height: '100%'}}>
            <ScrollView style={{backgroundColor: '#daebeb'}}>
            {chats.map((chat) => (
                <ChatContainer key={chat._id}>
                    <ImageContainer>
                        <ContainerImage source={{uri: chat.user.avatar}}/>
                    </ImageContainer>
                    <TextContainer key={chat._id}>
                        <TouchableNativeFeedback data-key={chat._id} onPress={() => goToChatMensagem(chat)}>
                            <View style={{display:'flex', flexDirection:'column'}}>
                                <View style={{display:'flex', flexDirection:'row'}}>
                                    <Text style={{fontWeight:'bold', fontSize:16, marginRight:'auto'}}>
                                    {`  ${chat.user.name}`}
                                    </Text>
                                    <Text style={{marginLeft:'auto'}}>
                                    {chat.data}
                                    </Text>
                                </View>
                                <View style={{display:'flex', flexDirection:'row',paddingTop: 5, paddingLeft:15}}>
                                <Text style={{fontSize:16, marginRight:'auto'}}>
                                    {`  ${chat.ultimaMensagem}`}
                                    </Text>
                                    <Text style={{marginLeft:'auto'}}>
                                    {/* {chat.hora} */}
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </TextContainer>
                </ChatContainer>))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Chat
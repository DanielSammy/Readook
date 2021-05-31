import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import Global from '../Global'
import io from 'socket.io-client'


const ChatMensagem = ({navigation, route}) => {
  const socket = io('http://192.168.0.27:8082')
  const codigoChat = route.params.chatCodigo;
  const nomeUsuario = route.params.name;
  const userDest = route.params.codigoDest
  const [ onLoad,setOnLoad ] = useState(true);
  const puxaUltimasMensagens = async () => {
    await fetch(`http://192.168.0.27:8082/chatMensagens/${codigoChat}`)
    .then(response => response.json())
    .then(results => transformMessages(results))
  }

  function transformMessages(results) {
    results.forEach((result) => {criaMensagem(result)})
  }

  function criaMensagem(mensagem){
    const newMessage = {};
    newMessage._id = mensagem.chm_codigo
    newMessage.text = mensagem.chm_mensagem
    newMessage.createdAt = mensagem.chm_datahora
    const user = {}
    user._id = mensagem.chm_usrcodigorem
    user.avatar= mensagem.usr_avatar
    user.name= mensagem.usr_nomecompleto
    newMessage.user = user
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  }

  const user1 = {
    _id: Global.user.usrCodigo,
    name: Global.user.usrNomeCompleto,
    avatar: Global.user.usrAvatar
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: nomeUsuario === '' ? 'No title' : nomeUsuario,
    });
  }, [navigation, nomeUsuario]);

  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    if (onLoad) {
      puxaUltimasMensagens();
      setOnLoad(false)
    }   
  },[onLoad])

  useEffect(() => {
    const handleNewMessage = novaMensagem => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }
    socket.on('chatMensagem', data => {
      if (data.usrDest == Global.user.usrCodigo) {
       console.log("oi")
      } else {
        console.log('boi')
      }
    })
  },[socket])

  const onSend = useCallback((messages = []) => {
    const data = {
      userDest : userDest,
      message : messages
    }
    socket.emit('chatMensagem', data)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <GiftedChat user={user1} messages={(messages)} onSend={onSend} renderAvatar={null}/>
  )
}

export default ChatMensagem;
import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatMensagem = ({navigation, route}) => {
  const codigoChat = route.params.chatCodigo;
  const nomeUsuario = route.params.name;
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
    _id: 1,
    name: "Otavio",
    avatar: 'https://hosting.photobucket.com/images/i/tadss/15624557_374919729537828_5178839507880902656_n.jpg?width=450&height=278&crop=fill'
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

  const onSend = useCallback((messages = []) => {
    
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <GiftedChat user={user1} messages={(messages)} onSend={onSend} renderAvatar={null}/>
  )
}

export default ChatMensagem;
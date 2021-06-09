import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert, BackHandler, SafeAreaView } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import { Avatar, Card, TextInput, Button, Text, } from 'react-native-paper'
import { GiftedChat, Day } from 'react-native-gifted-chat'
import Global from '../Global'
import io from 'socket.io-client'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'


const ChatMensagem = ({navigation, route}) => {
  const locale = dayjs.locale('pt-br')
  const socket = io('http://192.168.0.150:8082')
  const codigoChat = route.params.chatCodigo;
  const nomeUsuario = route.params.name;
  const userDest = route.params.codigoDest
  const [ onLoad,setOnLoad ] = useState(true);
  const puxaUltimasMensagens = async () => {
    await fetch(`http://192.168.0.150:8082/chatMensagens/${codigoChat}`)
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
      headerLeft:() => (<HeaderBackButton
        onPress={() => backAction()}
        title="Info"
        tintColor="#fff"
      />),
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
      setMessages(previousMessages => GiftedChat.append(previousMessages, novaMensagem))
    }
    socket.on('chatMensagem', data => {
      if (data.userDest == Global.user.usrCodigo) {
        handleNewMessage(data.message)
      } else {
        console.log('Não é pra ti')
      }
    })
    return () => socket.off('chatMensagem')
  },[messages])

  
    const backAction = () => {
       navigation.dispatch(
          CommonActions.reset({
          index: 1,
          routes:[
            {name: 'Principal'},
            {name: 'Chat'},
          ], 
        })
        )
      return true;
    };

    useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const mandaMensagemBD = async (newMessages) => {
    const informacaoInsert = newMessages
    informacaoInsert[0].chatCodigo = codigoChat
    informacaoInsert[0].usrDest = userDest
    const response = await fetch('http://192.168.0.150:8082/chatMensagens/novaMensagem', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(informacaoInsert)
            })
            .then(response => response.json())
  }

  const onSend =   useCallback( async (newMessages = []) => {
    await setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    const data = {
      userDest : userDest,
      message : newMessages
    }
    await socket.emit('chatMensagem', data)
    await mandaMensagemBD(newMessages)
  }, )

  return (
      <GiftedChat user={user1} 
      messages={(messages)} 
      onSend={onSend} 
      renderAvatar={null}/>
  )
}

export default ChatMensagem;
import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { theme } from '../PageStyle'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props) => {
  
  const teste = async () => {
    await fetch('http://192.168.0.27:8082/chatMensagens/1')
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
    newMessage.createdAt = `${mensagem.chm_data.substring(0,10)}T${mensagem.chm_hora}.000Z`
    const user = {}
    user._id = mensagem.chm_usrcodigorem
    user.avatar='https://instagram.fplu17-1.fna.fbcdn.net/v/t51.2885-19/s150x150/130977061_213673910195874_8290903381897238855_n.jpg?tp=1&_nc_ht=instagram.fplu17-1.fna.fbcdn.net&_nc_ohc=frqpMC4d2kwAX8W7mQm&edm=ABfd0MgBAAAA&ccb=7-4&oh=2cb22a02ed97995b378704d3d3ace6b8&oe=60B38C5C&_nc_sid=7bff83'
    user.name="Daniel"
    newMessage.user = user
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  }

  const user1 = {
    _id: 1,
    name: "Otavio",
    avatar: 'https://drive.google.com/file/d/1VOXiB1MQ9SGGy7GGcNoUPWdl49d4uvf6/view?usp=sharing'
  }

  const user2 = {
    _id: 2,
    name: "Daniel",
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg'
  }

  const [ messages, setMessages ] = useState([]);

  const atualizaMensagens = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const onSend = () => {
    teste();
  }

  return (
    <GiftedChat user={user1} messages={messages} onSend={onSend}/>
  )
}

export default Chat;
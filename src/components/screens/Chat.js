import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { telaChat } from '../Estilo'
import { theme } from '../PageStyle'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props) => {
  const teste = () => {
    fetch('http://192.168.0.27:8082/usuarios')
    .then(response => response.json())
    .then(users => console.warn(users))
  }
  const user1 = {
    _id: 1,
    name: "Otavio",
    avatar: "url"
  }

  const user2 = {
    _id: 2,
    name: "Daniel",
    avatar: "url"
  }

  const messages = [
    {
      _id: 1,
      text: "Boa Tarde",
      createdAt: new Date(),
      user : {user2},
    },
    {
      _id: 2,
      text: "Opa Fala ai Cara",
      createdAt: new Date,
      user: {user1},
    },
  ]

  function onSendMessage(message) {
    console.log(message)
  }

  return (
    <GiftedChat user={user1} messages={messages} onSend={teste}/>
  )
}

export default Chat;
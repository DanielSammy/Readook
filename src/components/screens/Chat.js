import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Card, TextInput, Button, Text } from 'react-native-paper'
import { telaChat } from '../Estilo'
import { theme } from '../PageStyle'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props) => {
  const user1 = {
    _id: 1,
    name: "Otavio",
    avatar: 'https://drive.google.com/file/d/1VOXiB1MQ9SGGy7GGcNoUPWdl49d4uvf6/view?usp=sharing'
  }

  const user2 = {
    _id: 2,
    name: "Daniel",
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg'
  }

  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Boa Noite, Como vai?',
        createdAt: new Date(Date.UTC(2021, 5, 20, 20, 10, 0)),
        user: {
          _id:2,
          name:'Otavio',
          avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
        },
      },
    ])
  },[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat user={user1} messages={messages} onSend={onSend}/>
  )
}

export default Chat;
import React, { useEffect, useState } from 'react'
import { Container } from '../../style'
import Header from '../Header/Header'
import {Tab} from '../Tabs/Tab'
import Global from './Global'
import { socket } from '../../services/socket'
import {useRoute, useNavigation} from '@react-navigation/native'
import PushNotification from 'react-native-push-notification'

export default function Home(props) {
    const navigation = useNavigation()
    const [ notification , setNotification ] = useState([])
    
    useEffect(() => {
        const handleNotification = (data) => {
            setNotification(data)
            const url = `${data.userRem.avatar}`
            PushNotification.localNotification({
                channelId: 'readook-channel',
                title: data.userRem.name,
                message: data.message,
                largeIconUrl: String(url)
            })
        }
        socket.on('notifyChatMensagem', data => {
            if (data.userDest === Global.user.usrCodigo) {
                const index = navigation.dangerouslyGetState().index ;
                const screenName = navigation.dangerouslyGetState().routes[index].name
                if (screenName === "ChatMensagem") {
                    const codigoChatNotificacao = data.chatCodigo
                    const codigoChatAtual = navigation.dangerouslyGetState().routes[index].params.chatCodigo;
                    console.log(screenName,codigoChatNotificacao,codigoChatAtual,index)
                    if (codigoChatAtual === codigoChatNotificacao) {
                        console.log("oi?")
                        return ''
                    }
                    else {
                        console.log(data)
                        handleNotification(data)
                    }
                }
                else {
                    
                    console.log("entrou aqui", index, screenName)
                handleNotification(data)
                }
                }
              })
              return () => {
                socket.off('notifyChatMensagem')}
            }, [notification])
    return (
        <Container>
            <Header/>        
            <Tab/>
        </Container>
        )
}
import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback } from 'react-native';
import { View, SafeAreaView, ScrollView } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { ChatContainer, ContainerImage, ImageContainer, TextContainer } from './styles';
import Global from '../Global'
import { HeaderBackButton } from '@react-navigation/stack';





const Chat = ({route, navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: Global.lingp ? 'Mensagens' : "Messages",
          headerRight:() => (<View style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton icon="plus" size={24} color="#FFF" onPress={() => goToChatUsuarios()}/>
            </View>
            ),
        });
      }, [navigation, Global.lingp])

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

    const goToChatUsuarios = () => {
        navigation.navigate('ChatUsuarios')
    }

    const [ chats, setChats ] = useState([])
    const [ onLoad, setOnLoad ] = useState(true)
    const carregaBatePapo = async (usuario) => {
        await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/chat/${usuario}`)
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
                    <TouchableNativeFeedback data-key={chat._id} onPress={() => goToChatMensagem(chat)}>
                        <TextContainer key={chat._id}>
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
                        </TextContainer>
                    </TouchableNativeFeedback>
                </ChatContainer>))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Chat
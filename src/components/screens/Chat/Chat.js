import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, TouchableNativeFeedback, BackHandler } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { ChatContainer, ContainerImage, ImageContainer, TextContainer } from './styles'
import Global from '../Global'
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { socket } from '../../../services/socket';
import ImagemPerfilModal from '../../ImagemPerfilModal/ImagemPerfilModal'
import { CommonActions } from '@react-navigation/native';

const Chat = ({route, navigation}) => {        
  const [ dataAtual, setDataAtual ]  = useState('')
  const [ visible, setVisible] = useState(false)
  const [ chats, setChats ] = useState([])
  const [ onLoad, setOnLoad ] = useState(true)
  const [ showAvatar, setShowAvatar] = useState('')
  const [ userName, setUserName] = useState('')


  useEffect(() => {
    navigation.setOptions(
      !visible ? { title: Global.lingp ? 'Mensagens' : "Messages",
      headerTitle: (props) => (<HeaderTitle style={{color:'white', fontSize:20}}>{props.children}</HeaderTitle>),
      headerRight:() => (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <IconButton icon="plus" size={24} color="#FFF" onPress={() => goToChatUsuarios()}/>
        </View>
            ),
      headerLeft:() => (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <HeaderBackButton
          onPress={() => backAction()}
          title="Info"
          tintColor="#fff"
        />
      </View>
          ),      
          } : { title: userName,
          headerRight:() => (<></>),
          headerTitle: (props) => (<HeaderTitle style={{color:'white', fontSize:18}}>{props.children}</HeaderTitle>),
        headerLeft:() => (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <HeaderBackButton
            onPress={() => setVisible(!visible)}
            title="Info"
            tintColor="#fff"
          />
        </View>
      ),});
  }, [visible,userName])

  const backAction = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 2,
            routes:[
              {name: 'Login'},
             {name: 'Principal'},
            ], 
          })
          )
       return true;
      };
      
    const goToChatUsuarios = () => {
      navigation.navigate('ChatUsuarios')
    }

    const carregaBatePapo = async (usuario) => {
        await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/chat/${usuario}`)
        .then(response => response.json())
        .then(results => transformChat(results))
    }

    const converterHoraParaLocal = (data) => {
        const novaData = new Date(data.getTime()+data.getTimezoneOffset()*60*1000)
        const diferenca = data.getTimezoneOffset() / 60
        const horas = data.getHours()
        const dia = data.getDate()
        novaData.setHours(horas - diferenca)
        if (horas >= 21 && horas <= 23) {
          novaData.setDate(dia)
        }
        return novaData
      }

    const transformChat = async (conversas) => {
        await conversas.forEach((conversa) => {criaConversa(conversa)})
    }

    const criaConversa = async (conversa) => {
        const data = converterHoraParaLocal(new Date(conversa.chm_datahora))
        const stringData = data.toISOString()
        const dataHoraCorreta = stringData.substr(0,stringData.length - 1)
        const newChat = {};
        newChat._id = conversa.cha_codigo
        newChat.ultimaMensagem = conversa.chm_mensagem
        if (Global.lingp) {
            newChat.data = `${dataHoraCorreta.substring(8,10)}/${dataHoraCorreta.substring(5,7)}/${dataHoraCorreta.substring(0,4)}`
        } else {
            newChat.data = `${dataHoraCorreta.substring(5,7)}/${dataHoraCorreta.substring(8,10)}/${dataHoraCorreta.substring(0,4)}`
        }
        newChat.hora = dataHoraCorreta.substring(11,16)
        newChat.naoLidas = conversa.chm_naolidas
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

      const handleNewMessageChat = (newMessage, oldMessages) => {
        const getMessages = oldMessages
        const chatCodigoReceived = newMessage.chatCodigo
        const chatIndex = getMessages.findIndex(chat => chat._id === chatCodigoReceived)
        const otherMessage = getMessages.splice(chatIndex,1) 
        const newChat = {};
        newChat._id = newMessage.chatCodigo
        newChat.ultimaMensagem = newMessage.text
        newChat.data = `${newMessage.createdAt.substring(8,10)}/${newMessage.createdAt.substring(5,7)}/${newMessage.createdAt.substring(0,4)}`
        newChat.hora = newMessage.createdAt.substring(11,16)
        newChat.naoLidas = otherMessage[0].naoLidas + 1
        const user = {}
        user._id = newMessage.user._id
        user.avatar= newMessage.user.avatar
        user.name= newMessage.user.name
        newChat.user = user
        const newMessages = [newChat, ...getMessages]
        setChats(newMessages)
      }

      useEffect(() => {
        socket.on('chat', data => {
          if (data.userDest == Global.user.usrCodigo) {
            handleNewMessageChat(data.message[0], chats)
          }
        })
        return () => {
          socket.off('chat')}
      },[chats])
    
      useEffect(() => {
        if (onLoad) {
          const data = converterHoraParaLocal(new Date())
          const stringData = data.toISOString()
          const dataHoraCorreta = stringData.substr(0,stringData.length - 1)
          if (Global.lingp) {
             setDataAtual(`${dataHoraCorreta.substring(8,10)}/${dataHoraCorreta.substring(5,7)}/${dataHoraCorreta.substring(0,4)}`)
          } else {
            setDataAtual(`${dataHoraCorreta.substring(5,7)}/${dataHoraCorreta.substring(8,10)}/${dataHoraCorreta.substring(0,4)}`)
          }
            carregaBatePapo(Global.user.usrCodigo);
            setOnLoad(false)
        }
        return () => {
            setChats([])
            setOnLoad(true)
        }
      },[])

      const chamaModal = (userAvatar, userName) => {
        setShowAvatar(userAvatar)
        setUserName(userName)
        setVisible(!visible)
      }

    return (
        <SafeAreaView style={{backgroundColor: '#daebeb', height: '100%'}}>
          <ScrollView style={{backgroundColor: '#daebeb'}}>
            {chats.map((chat) => (
              <ChatContainer key={chat._id}>
                <TouchableNativeFeedback data-key={`img${chat._id}`}onPress={() => chamaModal(chat.user.avatar, chat.user.name)}>
                  <ImageContainer >
                      <ContainerImage source={{uri: chat.user.avatar}}/>
                  </ImageContainer>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback data-key={chat._id} onPress={() => goToChatMensagem(chat)}>
                  <TextContainer key={chat._id}>
                    <View style={{display:'flex', flexDirection:'column'}}>
                      <View style={{display:'flex', flexDirection:'row'}}>
                          <Text style={{fontWeight:'bold', fontSize:16, marginRight:'auto'}}>
                          {`  ${chat.user.name}`}
                          </Text>
                          <Text style={{marginLeft:'auto'}}>
                          {chat.data === dataAtual ? chat.hora : chat.data}
                          </Text>
                      </View>
                      <View style={{display:'flex', flexDirection:'row',paddingTop: 5, paddingLeft:5}}>
                      <Text style={{fontSize:14, marginRight:'auto'}}>
                          {`  ${chat.ultimaMensagem}`}
                      </Text>
                      {chat.naoLidas != '0' ? 
                      <Text style={{fontSize:12,padding:2,paddingLeft:0, color:'#ffffff', backgroundColor:'#002244', borderRadius:3, textAlign:'center', height:25}}>
                          {`${chat.naoLidas} ${Global.lingp? "Não Lidas" : "Unseen"}` }
                      </Text>
                      : <></>}
                      </View>
                    </View>
                  </TextContainer>
                </TouchableNativeFeedback>
              </ChatContainer>
            ))}
          </ScrollView>
            <ImagemPerfilModal imageUri={showAvatar} visible={visible} onChangeVisible={setVisible} userName={userName} />       
        </SafeAreaView>
    )
}

export default Chat
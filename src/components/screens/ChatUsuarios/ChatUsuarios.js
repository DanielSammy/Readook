import React, { useState, useEffect, useCallback } from 'react'
import { TouchableNativeFeedback, BackHandler } from 'react-native';
import { View, SafeAreaView, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import {HeaderBackButton} from '@react-navigation/stack'
import { CommonActions, useNavigation, useNavigationState } from '@react-navigation/native'
import { ChatContainer, ContainerImage, ImageContainer, TextContainer } from './styles';
import io from 'socket.io-client'
import Global from '../Global'

const ChatUsuarios = ({route, navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: Global.lingp ? 'Usuarios' : "Users",
          headerLeft:() => (<View style={{display: 'flex', flexDirection: 'row'}}><HeaderBackButton
        onPress={() => backAction()}
        title="Info"
        tintColor="#fff"
      />
      </View>
      ),
        });
      }, [navigation, Global.lingp])

      const navegacao = useNavigation();

      const backAction = () => {
        const actualIndex = navegacao.dangerouslyGetState().index
        const newIndex = actualIndex - 1
        navigation.dispatch(
           CommonActions.reset({
           index: newIndex,
           routes:[
             {name: 'Principal'},
             {name: 'Chat'},
           ], 
         })
         )
       return true;
     };

    const [ users, setUsers ] = useState([])
    const [ onLoad, setOnLoad ] = useState(true)
    const carregaUsuarios = async (usuario) => {
        await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/chat/getUsersToChat/${usuario}`)
        .then(response => response.json())
        .then(results => transformContainer(results))
    }

    const transformContainer = async (usuarios) => {
        await usuarios.forEach((usuario) => {criaContainerUsuario(usuario)})
    }

    const criaContainerUsuario = async (usuario) => {
        const user = {}
        user._id = usuario.usr_codigo
        user.avatar= usuario.usr_avatar
        user.name= usuario.usr_nomecompleto
        await setUsers((prevState) => ([
            ...prevState , 
            user]))
      }

    const goToChatMensagem = async (usuario) => {
        const chatUsuario = await fetch(`http://${Global.ipBancoDados}:${Global.portaBancoDados}/chatUsuarios/${Global.user.usrCodigo}/${usuario._id}`)
        .then(response => response.json())
        navigation.navigate('ChatMensagem', {
            chatCodigo: chatUsuario[0].cha_codigo,
            codigoDest: usuario._id,
            name: usuario.name,
            avatar: usuario.avatar})
            
      }

      useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    
      useEffect(() => {
        if (onLoad) {
            carregaUsuarios(Global.user.usrCodigo);
            setOnLoad(false)
        }
        return () => {
            setUsers([])
            setOnLoad(true)
        }
      },[])
    
    return (
        <SafeAreaView style={{backgroundColor: '#daebeb', height: '100%'}}>
            <ScrollView style={{backgroundColor: '#daebeb'}}>
            {users.map((user) => (
                <ChatContainer key={user._id}>
                    <ImageContainer>
                        <ContainerImage source={{uri: user.avatar}}/>
                    </ImageContainer>
                    <TouchableNativeFeedback data-key={user._id} onPress={() => goToChatMensagem(user)}>
                        <TextContainer key={user._id}>
                            <View style={{display:'flex', flexDirection:'column'}}>
                                <View style={{display:'flex', flexDirection:'row'}}>
                                    <Text style={{fontWeight:'bold', fontSize:16, marginRight:'auto'}}>
                                    {`  ${user.name}`}
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

export default ChatUsuarios
import React, { useState } from 'react'
import { Container, TabsContainer, TabItem, TabText  } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import {  TouchableNativeFeedback } from 'react-native';
import Global from '../screens/Global'



export const Tab = () => {
const navigation = useNavigation();

return(
    <Container>
        <TabsContainer>  
            <TouchableNativeFeedback onPress={()=>navigation.navigate('Profile')}>
                <TabItem >
                    <Icon name="person" size={24} color="#FFF"/>
                        <TabText>{Global.lingp ? "Meu Perfil" : "Profile"}</TabText>
                </TabItem>
            </TouchableNativeFeedback> 

            <TouchableNativeFeedback onPress={()=>navigation.navigate('Livros')} >  
                <TabItem>
                    <Icon name="auto-stories" size={24} color="#FFF"/>
                        <TabText>{ Global.lingp ? "Biblioteca" : "Library" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Chat')}>
                <TabItem>                
                    <Icon name="chat" size={24} color="#FFF"/>
                        <TabText>{ Global.lingp ? "Bate Papo" : "Chat" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Maps')}>
                <TabItem>
                    <Icon name="pin-drop" size={24} color="#FFF" />
                        <TabText>{ Global.lingp ? "Localizar no mapa" : "Map Localization" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

        </TabsContainer>
    </Container>
)

}


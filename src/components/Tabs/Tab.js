import React from 'react'
import { Container, TabsContainer, TabItem, TabText  } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import {  TouchableNativeFeedback } from 'react-native';



export const Tab = ({lingp}) => {
const navigation = useNavigation();

return(
    <Container style={{bottom: 10}}>
        <TabsContainer>  
            <TouchableNativeFeedback onPress={()=>navigation.navigate('Profile')}>
                <TabItem >
                    <Icon name="person" size={24} color="#FFF"/>
                        <TabText>{lingp ? "Meu Perfil" : "Profile"}</TabText>
                </TabItem>
            </TouchableNativeFeedback> 

            <TouchableNativeFeedback onPress={()=>navigation.navigate('Livros')} >  
                <TabItem>
                    <Icon name="auto-stories" size={24} color="#FFF"/>
                        <TabText>{ lingp ? "Biblioteca" : "Library" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Chat')}>
                <TabItem>                
                    <Icon name="chat" size={24} color="#FFF"/>
                        <TabText>{ lingp ? "Bate Papo" : "Chat" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Maps')}>
                <TabItem>
                    <Icon name="pin-drop" size={24} color="#FFF" />
                        <TabText>{ lingp ? "Localizar no mapa" : "Map Localization" }</TabText>
                </TabItem>
            </TouchableNativeFeedback>

        </TabsContainer>
    </Container>
)

}


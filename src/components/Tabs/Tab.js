import React from 'react'
import { Container, TabsContainer, TabItem, TabText  } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Livros from '../screens/Livros'
import { useNavigation } from '@react-navigation/native';
import {  TouchableNativeFeedback } from 'react-native';




export const Tab = () => {
const navigation = useNavigation();

return(
    <Container>
        <TabsContainer>  
            <TouchableNativeFeedback>
                <TabItem >
                    <Icon name="person" size={24} color="#FFF"/>
                        <TabText>Meu Perfil</TabText>
                </TabItem>
            </TouchableNativeFeedback> 

            <TouchableNativeFeedback onPress={()=>navigation.navigate('Livros')} >  
                <TabItem>
                    <Icon name="auto-stories" size={24} color="#FFF"/>
                        <TabText>Biblioteca</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Chat')}>
                <TabItem>                
                    <Icon name="chat" size={24} color="#FFF"/>
                        <TabText>Bate Papo</TabText>
                </TabItem>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
                <TabItem>
                    <Icon name="pin-drop" size={24} color="#FFF"/>
                        <TabText>Localizar no mapa</TabText>
                </TabItem>
            </TouchableNativeFeedback>

        </TabsContainer>
    </Container>
)

}


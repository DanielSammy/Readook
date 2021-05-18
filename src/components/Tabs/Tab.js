import React from 'react'
import { Container, TabsContainer, TabItem, TabText  } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Livros from '../screens/Livros'
import { useNavigation } from '@react-navigation/native';




export const Tab = () => {
const navigation = useNavigation();

return(
    <Container>
        <TabsContainer>    
        <TabItem>
        <Icon name="person" size={24} color="#FFF"/>
        <TabText  onPress={()=>navigation.navigate('Livros')}>Meu Perfil</TabText>
        </TabItem>
            <TabItem>
                <Icon name="auto-stories" size={24} color="#FFF"/>
                <TabText>Biblioteca</TabText>
            </TabItem>
            <TabItem>
                <Icon name="search" size={24} color="#FFF"/>
                <TabText>Pesquisar Livros</TabText>
            </TabItem>
            <TabItem>
                <Icon name="chat" size={24} color="#FFF"/>
                <TabText>Bate Papo</TabText>
            </TabItem>
            <TabItem>
                <Icon name="pin-drop" size={24} color="#FFF"/>
                <TabText>Localizar no mapa</TabText>
            </TabItem>
        </TabsContainer>
    </Container>
)

}


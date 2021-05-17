import React from 'react'
import { Container, TabsContainer, TabItem, TabText  } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Livro from '../screens/livros'

export default function Tab(props) {
return(
    <Container>
        <TabsContainer>
            <TabItem>
                <Icon name="person" size={24} color="#FFF"/>
                <TabText  >Meu Perfil</TabText>
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
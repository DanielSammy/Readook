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
        <React.Fragment>
        <TabItem onPress={()=>navigation.navigate('Livros')}>
        <Icon name="person" size={24} color="#FFF"/>
        <TabText  >Meu Perfil</TabText>
        </TabItem>
        </React.Fragment> 
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


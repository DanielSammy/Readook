import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, ScrollView, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';
import { Avatar, Card, DefaultTheme, IconButton } from 'react-native-paper';
import { card, theme } from './PageStyle';

// <AntDesign name="plus" size={24} color="#4F8EF7" />

export default function FabButon (props) {
    const [ valor, setValor ] = useState(0);
    const animation = new Animated.Value(valor)

    function AlterValue() {
        if (valor == 0) {
            setValor(1)
        } else {
            setValor(0)
        }
    }

    const toggleMenu = () => {
        const toValue = valor ? 0 : 1

        Animated.spring(animation, {
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();
        AlterValue()
    }

    {

        const addBook = {
            transform: [
                { scale: animation},
                {
                    translateY: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -60]
                    })
                }
            ]
        }

        const searchBook = {
            transform: [
                { scale: animation},
                {
                    translateY: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -115]
                    })
                }
            ]
        }

        const rotation =  {
            transform: [
                {translateX: animation },
                {
                    rotate: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '45deg'],
                        
                        
                    })
                }
            ]
        }

        return (
            <React.Fragment>
            <ScrollView> 
<Card.Title style={styles.card}
            title="Orgulho e Preconceito" 
            subtitle="Autor: Jane Austen" 
            left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant"/>}
            right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>
           

<Card.Title style={styles.card}
    title="Em Busca Do Tempo Perdido"
    subtitle="Autor: Marcel Prroust"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={styles.card}
    title="Admirável Mundo Novo"
    subtitle="Autor: Aldous Leonard Huxley"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={styles.card}
    title="Nunca Desista de Seus Sonhos"
    subtitle="Autor: Augusto Cury"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={styles.card}
    title="O Menino e o Rio"
    subtitle="Autor: Paulo Castro"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

    
<Card.Title style={styles.title}
    title="O Inferno Somos Nós"
    subtitle="Autor: Coen Roshi & Leandro Karnal "
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Capitães da Areia"
    subtitle="Autor: Jorge Amado"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="A vida secreta dos animais"
    subtitle="Autor: Peter Wohlleben"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="A revolução dos bichos"
    subtitle="Autor George Orwell:"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="A Torre Negra: O Pistoleiro"
    subtitle="Autor: Stephen King"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="O Dilema do Porco-Espinho"
    subtitle="Autor: Leandro Karnal"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Chico Bento"
    subtitle="Autor: Mauricio de Sousa"
    left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

</ScrollView>
            
            <View style={[styles.container, props.style]}>
            <TouchableWithoutFeedback onPress={()=> alert('Pesquisar Livros')}>
            <Animated.View style={[styles.button, styles.submenu, searchBook ]}>    
            <Icon name="search" size={24} color="#FFF" />
            </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={()=> alert('Adicionar Livros')}>
            <Animated.View style={[styles.button, styles.submenu, addBook]}>  
            <Icon name="playlist-add" size={24} color="#FFF" />  
            </Animated.View>
            </TouchableWithoutFeedback>
           
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>    
                    <Icon name="add" size={24} color="#FFF" />
                    
                </Animated.View>
            </TouchableWithoutFeedback>
            
            </View>
    
</React.Fragment>
        );
    }
}


const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      position: 'absolute'
    },
    button:{
        position:'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems:'center',
        shadowRadius: 10,
        shadowColor: '#002244',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        }
    },
    menu:{
        backgroundColor:'#002244'
    },
    submenu:{
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#002244',

    },
    card:{
        borderStyle: 'solid',
        margin: 2,
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontFamily: 'Lastica',
        borderColor: '#002244',
    },
    icon: {
        color: theme.colors.primary
      }
  })



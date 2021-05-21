import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';
import { Avatar, Card, DefaultTheme, IconButton } from 'react-native-paper';
import { theme } from './PageStyle';

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
            <Card.Title style={styles.icon.color}
    title="A culpa é das Estrelas" 
    subtitle="Card Subtitle" 
    left={(props) => <Avatar.Icon  size={45} icon="folder"/>}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={styles.card}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={styles.title}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}/>

<Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 10}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon size={45} icon="folder" />}
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



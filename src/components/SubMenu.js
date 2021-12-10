import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Card, IconButton, Portal, Modal,TextInput, Provider, Button, Text} from 'react-native-paper';
import { card, theme } from './PageStyle';
import axios from 'axios'
import { telaCadastro } from './Estilo';
import Global from './screens/Global';


export default function FabButon (props) {
    const [ valor, setValor ] = useState(0);
    const [ onLoad, setOnLoad ]  = useState(true);
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
        
const [ livro, setLivros ] = useState([])

const newBook =   useCallback( async () => {
    const newLivros = {}
    newLivros.nome = nome
    newLivros.autor = autor
    newLivros.objetivo = objetivo
    newLivros.email_contato = Global.user.usrEmail
    setLivros([...livro, newLivros])})


useEffect(() => {
    if (onLoad) {
        axios.get('https://meuservidordetrabalho.herokuapp.com/base')
        .then(res => {
            const livro = res.data
            setLivros( livro )
          })
          .catch(function (error) {
            console.log(error)
          }) //Fim do Axios


        setOnLoad(false)
    }
    return () => {
        setLivros([]);
        setOnLoad(true);
    }
    
  },[]);


    const [visible, setVisible] = useState(false);
    const [ resume, setResume] = useState(false);
  
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 100, borderRadius: 10 };
    const showResume = () => setResume(true);
    const hideResume = () => setResume(false);
    const resumeStyle = {backgroundColor: 'white', padding: 100, borderRadius: 10, margin: 15 };
    // Fim do Modal
    

    const [autor, setAutor] = useState(undefined)
    const [nome, setNome ] = useState(undefined)
    const [objetivo, setObjetivo ] = useState(undefined)

    function setarAutor (e){
        setAutor (e)
    } 

    function setarNome (e){
        setNome (e)
    } 
    
    function setarEmail (e){
        setEmail (e)
    } 
    
    function setarObj (e){
        setObjetivo (e)
    } 

    function cadastrar() {
        
        axios.post('https://meuservidordetrabalho.herokuapp.com/cadastro', {
        nome: nome,
            autor:autor,
            email_contato:Global.user.usrEmail,
            objetivo:objetivo
            
        })
    }  //Fim do Post


        return (
            <React.Fragment>
            <ScrollView>
                {livro.map(  (e) => {
                    return(

                        <Card.Title style={styles.card}
                        key={e._id}
                        title= {e.nome}
                        subtitle= {e.autor} 
                        left={(props) => <Avatar.Icon theme={card} size={45} icon="book-open-page-variant"/>}
                        right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {
                            showResume()
                        }} />}/>
                        )
                    })   
                }
</ScrollView>
          <View style={[styles.container, props.style]}>
          <TouchableWithoutFeedback onPress={() => alert('Pesquisar Livros')}>
          <Animated.View style={[styles.button, styles.submenu, searchBook ]}>    
          <Icon name="search" size={24} color="#FFF" />
          </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={showModal}>
            <Animated.View style={[styles.button, styles.submenu, addBook]}>  
            <Icon name="post-add" size={24} color="#FFF" />  
            </Animated.View>
            </TouchableWithoutFeedback>
           
            <TouchableWithoutFeedback onPress={toggleMenu} >
            <Animated.View  style={[styles.button, styles.menu, rotation]}>    
            <Icon name="add" size={24} color="#FFF" />
            
            </Animated.View>
            </TouchableWithoutFeedback>
            </View>
                <Provider>
            <Portal>
               <Modal style={{padding: 10}} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                   {Global.lingp ? 
                   <Text style={{fontSize:23, marginTop:-90, marginLeft:-9, paddingBottom:30, top: 20, textAlign:"center"}} theme={theme}>{"Inserir Novo Livro"}</Text>
                    : <Text style={{fontSize:23, marginTop:-90, paddingBottom:30, textAlign:"center"}} theme={theme}>{"Insert new Book"}</Text>
                    }
                    <TextInput Value="" key='1' onChangeText={(a)=> {setarNome (a)}} label={Global.lingp ? "Nome do Livro" : "Book Name"} theme={theme}/>
                    <TextInput Value="" key='2' onChangeText={(a)=> {setarAutor (a)}} label={Global.lingp ? "Autor do Livro" : "Book Author"} theme={theme}/>
                    <TextInput Value="" key='4' onChangeText={(a)=> {setarObj (a)}}label={Global.lingp ? "Objetivo" : "For"} theme={theme}/>
          <Button onPress={() => {
              cadastrar()
              hideModal()
              newBook()
          }} mode="contained" style={telaCadastro.button} theme={theme}>{Global.lingp ? "Cadastar" : "Insert"}</Button>
          </Modal>
          </Portal>
          
            </Provider> 
            <Provider>
            <Portal>

          <Modal visible={resume} onDismiss={hideResume} contentContainerStyle={resumeStyle}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{Global.lingp ? 'Tela para informações do Resumo do livro' : 'Book Summary Information Screen'}</Text>
        </Modal>
            </Portal>
            </Provider>
            
            
    
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



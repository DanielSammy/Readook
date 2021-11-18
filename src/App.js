import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import Home from './components/screens/Principal'
import { LoginScreen } from './components/screens/Login'
import { Cadastro } from './components/screens/Cadastro'
import ChatMensagem from './components/screens/ChatMensagem/ChatMensagem'
import Chat from './components/screens/Chat/Chat'
import ChatUsuarios from './components/screens/ChatUsuarios/ChatUsuarios'
import Livro from './components/screens/Livros'
import Maps from './components/screens/Maps'
import Profile from './components/screens/Profile'
import Global from './components/screens/Global'


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options ={{headerTransparent: true, title:''}}/>
    <Stack.Screen name="Cadastro" component={Cadastro} options={{title: Global.lingp ? 'Cadastro' : 'Registration' ,headerStyle:{ backgroundColor: '#002244',},headerTintColor: '#fff'}}/>
    <Stack.Screen name="Principal" component={Home} options={{headerTransparent: true,title:'', headerShown: false}}/>
    <Stack.Screen name="Profile" component={Profile} options={{headerTransparent: false, title:'Daniel Sammy', headerStyle:{ backgroundColor: '#002244',},headerTintColor: '#fff'}}/> 
    <Stack.Screen name="Livros" component={Livro} options={{title: Global.lingp ? "Livros" : "Books" ,headerStyle:{ backgroundColor: '#002244',},headerTintColor: '#fff'}}/>
    <Stack.Screen name="Chat" component={Chat} options={{title:Global.lingp ? 'Mensagens' : 'Messages', headerStyle:{backgroundColor: '#002244'},headerTintColor: '#fff'}}/>
    <Stack.Screen name="ChatUsuarios" component={ChatUsuarios} options={{ headerStyle:{backgroundColor: '#002244'},headerTintColor: '#fff'}}/>
    <Stack.Screen name="ChatMensagem" component={ChatMensagem} options={{ headerStyle:{backgroundColor: '#002244'},headerTintColor: '#fff'}}/>
    <Stack.Screen name="Maps" component={Maps} options ={{headerTransparent: true, title:''}}/>
    </Stack.Navigator>
  );
}


export default function App() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    )
  }
  
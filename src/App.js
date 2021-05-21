import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import Home from './components/screens/Principal'
import { LoginScreen } from './components/screens/login'
import { Cadastro } from './components/screens/cadastro'
import Chat from './components/screens/Chat'
import Livro from './components/screens/Livros'


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Principal" component={Home} options={{headerTransparent: true, title:''}}/>
    <Stack.Screen name="login" component={LoginScreen} options ={{headerTransparent: true, title:''}}/>
    <Stack.Screen name="Livros" component={Livro}/>
    <Stack.Screen name="cadastro" component={Cadastro}/>
    <Stack.Screen name="Chat" component={Chat} options={{title: 'Daniel Sammy'}}/>
      
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

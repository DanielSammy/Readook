import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import Home from './components/screens/Principal'
import { LoginScreen } from './components/screens/login'
import { Cadastro } from './components/screens/cadastro'
import Livro from './components/screens/Livros'
import Tab from './components/Tabs/Tab'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="login" component={LoginScreen} options ={{headerTransparent: true, title:''}}/>
    <Stack.Screen name="cadastro" component={Cadastro}/>
    <Stack.Screen name="Principal" component={Home} options={{headerTransparent: true, title:''}}/>
    <Stack.Screen name="Livros" component={Livro} options={{}}/>
      
    </Stack.Navigator>
  );
}


export default function App() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }


// return (
//     <Container>
//         <Header/>          
//         <Tab/>
//     </Container>
//     )

//     const Stack = createStackNavigator()

//     return(
            
//           <NavigationContainer>
//               <Stack.Navigator>
//               <Stack.Screen name="login" component={LoginScreen}/>
//               <Stack.Screen name="cadastro" component={Cadastro}/>
//               <Stack.Screen name="livros" component={Livro}/>
//               </Stack.Navigator>
//           </NavigationContainer>
//        )
// }
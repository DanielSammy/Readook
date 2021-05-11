import React from 'react'
import {Provider as PaperProvider, TextInput} from 'react-native-paper'
import {logomarca} from './components/Img/logomarca'
import {LoginScreen} from './components/login'

const App = () => {
       return (
         <PaperProvider>
         <LoginScreen/>
          </PaperProvider>
       )
}

export default App;

import React from 'react'
import { View, Stylesheet, SafeAreaView } from 'react-native'

export default ( ) => (

    <SafeAreaView style={style.App}>
        <Diferenciar />
    
    </SafeAreaView>
) 

const style = Stylesheet.create ({
    App: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    }
})
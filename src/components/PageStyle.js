import { DefaultTheme } from "react-native-paper";
import {StyleSheet} from 'react-native'

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#002244",
        background: "transparent",
    }
}

export const card = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#002244",
        background: "transparent",
    }
}

export const styleMap = StyleSheet.create({
    flex: {
        flex:1
    },
    fab: {
        backgroundColor:'#002244',
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 25

    }
})
  import { StyleSheet} from 'react-native'
import { card, theme } from './PageStyle'

  // export default StyleSheet.create({
  //         App: {
  //             flexGrow: 1,
  //             justifyContent: "center",
  //             alignItems: "center",
  //             padding: 20,
  //             padding: 20,
  //             backgroundColor: "#002244",
  //     }
  //   })

    export const loginStyle = StyleSheet.create({
      content: {
        display:"flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#002244",

      },
      view:{
        width:"80%",
      },
      avatar: {
        top: -37,
        left: "35%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#002244",
        backgroundColor: "#E8E8E8",
      },

      cardButton: {
        margin: 2,
        backgroundColor: "#002244"
        
      },
      cardLabel: {
        margin: 4,
        color: "#FFFFFF"
      },

    })

    export const telaCadastro = StyleSheet.create({
      pagcad: {
        padding: 30,
        paddingTop: 0
      },
      
      icon: {
        color: theme.colors.primary
      },
      button: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0,
      },
      card: {
        color: card.colors.primary
      }

    })

import React, {useState} from 'react'
import { Text,  StyleSheet, SafeAreaView, View, TouchableHighlight } from 'react-native'
import { Button,  } from 'react-native-paper'
import { Container} from '../Header/style';
import logo from '../Img/logoR.png'
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Global from './Global'




export default function Profile({navigation}) {
   const [imageSource, setImageSource ] = useState(Global.user.usrAvatar)

   React.useLayoutEffect(() => {
      navigation.setOptions({
        title: Global.user.usrNomeCompleto === '' ? (Global.lingp ? 'Perfil' : "Profile") : Global.user.usrNomeCompleto,
      });
    }, [navigation, Global.user.usrNomeCompleto]);

   return (
      <SafeAreaView>
         <Container>
            <TouchableHighlight style={{marginTop:10, borderRadius: 15}} onPress={() => {
            navigation.navigate('UploadScreen')
            }
            }>
               <Logo borderRadius={15}  source={{uri: `${imageSource}`}}></Logo>
            </TouchableHighlight>
         </Container>
<View>
      <Text style={styles.Perfil}>Email: {Global.user.usrEmail}</Text>
      <Icon name="mail" size={25} style={styles.icon}/> 
</View>
<View>
      <Text style={styles.Perfil}>{Global.lingp? "Telefone" : "Phone Number"}: {Global.user.usrFone}</Text>
      <Icon name="phone" size={25} style={styles.icon}/> 
</View>
<View>
      <Text style={styles.Perfil}>{Global.lingp ? "Localização" : "Localization"}: </Text>
      <Icon name="map" size={25} style={styles.icon}/> 
</View>
      </SafeAreaView>      
   );
 }

export const Logo = styled.Image`
   width: 150px;
   height: 150px;

`;




const styles = StyleSheet.create({
   Perfil:{
      left: 0,
      top: 30,
      position: 'relative',
      alignItems: 'flex-start',
      right: 0,
      marginLeft: 30,
      padding: 13,

   },
   icon: {
      padding: 10,
      alignItems:'flex-start',
      top: 30,
         position: 'absolute',
   },
   image: {
      top: 70,
      alignItems: 'center',
      padding: 30,
   }


})
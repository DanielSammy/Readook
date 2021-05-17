import React from 'react'
import { Container, Top, Logo, Title } from './style'
import logo from '../Img/logo1x.png'
// import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Header() {
return(
    <Container>
        <Top>
        <Title> Readook</Title>
        </Top>
        <Logo source={logo}/>
    </Container>
)

}






// import React from 'react'
// import { Appbar } from 'react-native-paper'

// export const Header = (props: HeaderParams) => {

//     return (
//         <Appbar>
//         <Appbar.BackAction />
//         <Appbar.Content title={props.title}/>
//         </Appbar>
//     )
// }

// interface HeaderParams {
//     title: string;
// }
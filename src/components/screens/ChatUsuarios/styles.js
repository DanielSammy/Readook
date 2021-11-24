import styled from 'styled-components/native'

export const ChatContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    margin-top: 5px;
    background-color: #cecece;
`
export const ImageContainer = styled.View`
    width:70px;
    height:100%;
`

export const ContainerImage = styled.Image`
    flex:1;
    width: 100%;
    height: 70px;
    resize-mode: cover;
    border-radius: 21px;
`
export const TextContainer = styled.View`
    width: 80%;
`
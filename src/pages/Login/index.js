import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Container,ImageBackground} from './styles';
export default class Login extends Component {
    render() {
        return (
            <Container>
                 <ImageBackground source={require('../../../../buscaCep/assets/backgroundLogin.png')}> 

                 </ImageBackground>
            </Container>
        )
    }
}
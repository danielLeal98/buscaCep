import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './pages/Home/Dados';
import Favorites from './pages/Favorites';
import Erro from './pages/Erro';
import Login from './pages/Login';
import Maps from './pages/Maps/Maps';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Favorites:{
    screen: Favorites, 
    navigationOptions: {
      header: null,
    }, 
  },
  Erro:{
    screen: Erro, 
    navigationOptions: {
      header: null,
    },
  },
  Login:{
    screen: Login, 
    navigationOptions: {
      header: null,
    },
  },
  Maps:{
    screen: Maps, 
    navigationOptions: {
      header: null,
    },
  },    
},
);

export default createAppContainer(AppNavigator);
import React, { Component } from 'react';
import { createAppContainer, SwitchActions  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/components/Login'
import HomeScreen from './src/components/Home'
import DetailScreen from './src/components/Detail'

const rootStack = createStackNavigator(
  {
    HomeScreen,
    DetailScreen,
    Login
  }, {
    headerMode : 'none',
    initialRouteName : 'HomeScreen'
  }
)

const AppContainer = createAppContainer(rootStack)

export default class App extends Component {
  render(){
    return <AppContainer />;
  }
}
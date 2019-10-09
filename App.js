import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/components/Login'
import HomeScreen from './src/components/Home'
import Favorite from './src/components/Favorite'
import Profile from './src/components/Profile'

const appStack = createStackNavigator(
  {
    HomeScreen,
  }, {
    headerMode : 'none',
    initialRouteName : 'HomeScreen'
  }
)

const profileStack = createStackNavigator(
  {
    Profile
  }, {
    headerMode : "none"
  }
)

const favStack = createStackNavigator(
  {
    Favorite
  },
  {
    headerMode : 'none'
  }
)

const authStack = createStackNavigator({
  Login
}, {
  headerMode : 'none',
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      appStack,
      authStack,
      favStack,
      profileStack
    },
    {
      initialRouteName: 'appStack',
    }
  )
);

export default class App extends Component {
  render(){
    return <AppContainer />;
  }
}

console.disableYellowBox = true;
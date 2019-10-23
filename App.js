import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/components/Login'
import HomeScreen from './src/components/Home'
import Favorite from './src/components/Favorite'
import Profile from './src/components/Profile'
import ProfileEdit from './src/components/ProfileEdit'
import Details from './src/components/Details'
import EpisodeDetails from './src/components/EpisodeDetails'
import CreationScreen from './src/components/CreationScreen'
import ComicCreationScreen from './src/components/ComicCreationScreen'
import CreateEpisode from './src/components/CreateEpisode'
import EditWebToon from './src/components/EditWebToon'
import EditEpisode from './src/components/EditEpisode'
import FatchData from './src/components/fatchData'
import FatchDataL from './src/components/fatchDataL'
import Search from './src/components/Search'
import AddComicScreen from './src/components/AddComicScreen'

// Option untuk handler Image dari image picker

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const appStack = createStackNavigator(
  {
    HomeScreen,
    Details,
    EpisodeDetails,
    Search
  }, {
    headerMode : 'none',
    initialRouteName : 'HomeScreen'
  }
)

const profileStack = createStackNavigator(
  {
    Profile,
    CreationScreen,
    ComicCreationScreen,
    CreateEpisode,
    EditWebToon,
    EditEpisode,
    AddComicScreen
  }, {
    initialRouteName : 'Profile',
    headerMode : "none"
  }
)

const profileEditStack = createStackNavigator(
  {
    ProfileEdit
  }, {
    initialRouteName : 'ProfileEdit',
    headerMode : "none"
  }
)

const favStack = createStackNavigator(
  {
    Favorite,
    Details,
    EpisodeDetails,
    Search
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

const fatchStack = createStackNavigator({
  FatchData,
  FatchDataL,
  Search
}, {
  initialRouteName : 'Search',
  headerMode : 'none'
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      appStack,
      authStack,
      favStack,
      profileStack,
      fatchStack,
      profileEditStack
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
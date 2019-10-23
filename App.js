import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Redux Provider
import { Provider } from 'react-redux';
import store from './src/components/ReduxSendBoxTwo'

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
import Search from './src/components/Search'
import AddComicScreen from './src/components/AddComicScreen'

import FatchData from './src/components/fatchData'
import FatchDataL from './src/components/fatchDataL'
import ReduxSendBoxOne from './src/components/ReduxSendBoxOne'
import ReduxSendBoxTwo from './src/components/ReduxSendBoxTwo'



const reduxStack = createStackNavigator(
  {
    ReduxSendBoxOne,
  }, {
    headerMode : 'none',
    initialRouteName : 'ReduxSendBoxOne'
  }
)

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
      reduxStack,
      profileEditStack
    },
    {
      initialRouteName: 'reduxStack',
    }
  )
);

export default class App extends Component {
  render(){
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    )
  }
}

console.disableYellowBox = true;
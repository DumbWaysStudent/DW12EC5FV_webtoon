/**
 * @format
 */


import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import SplashScreen from './src/components/SplashScreen'
import {name as appName} from './app.json';


class Main extends Component {
    constructor(){
        super()
        this.state = {
            currentScreen : 'SplashScreen'
        }

        setTimeout(() => {
            this.setState({
                currentScreen : 'App'
            })
        }, 1000)
    }

    render(){
        let mainScreen = this.state.currentScreen === 'SplashScreen' ? <SplashScreen /> : <App />
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => Main);

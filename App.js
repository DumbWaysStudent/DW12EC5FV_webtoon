import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { createAppContainer, SwitchActions  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import Login from './src/components/Login'
import HomeScreen from './src/components/Home'


class LoginScreen extends Component{
  render(){
    return (
      <Login nav={this.props.navigation.navigate} />
    )
  }
}

class DetailScreen extends Component {
  render(){
    return (
      <View>
        <Text>
          Ini adalah laman detail
        </Text>
        <TouchableOpacity 
          style={{padding: 10, backgroundColor:'#D0D0D0'}} 
          // Push di gunakan untuk terus-terusan menambahkan stack didalam stackNavigotor kita, 
          // contohnya di bawah padahal laman detailv jika klik go to detail 4 kali,
          // dan kita klik back maka akan kembali ke detail sebanyak 4 kali
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{padding: 10, backgroundColor:'#D0D0D0'}} 
          // Secara default saat kita melakukan navigate dan push kondisinya akan menambahakan button dengan
          // fungsi goBack() kita sendiri dapat memanggil fungsi ini saat kita butuhkan seperti contoh di bawah
          onPress={() => this.props.navigation.goBack()}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{padding: 10, backgroundColor:'#D0D0D0'}} 
          // Secara default saat kita melakukan navigate dan push kondisinya akan menambahakan button dengan
          // fungsi goBack() kita sendiri dapat memanggil fungsi ini saat kita butuhkan seperti contoh di bawah
          // Saat melakukan naviaget ke initialRouteName back button akan di hilangkan
          // sedangkan saat melakukan push() back button akan muncul
          // kita juga dapat menggunakan navigation.popToTop() untuk kembali ke first stack dan back button juga tidak akan muncul
          onPress={() => this.props.navigation.popToTop()}>
          <Text>
            HomeScreen
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const rootStack = createStackNavigator(
  {
    Home : HomeScreen,
    Details : DetailScreen,
    Login : LoginScreen
  }, {
    headerMode : 'none',
    initialRouteName : 'Home'
  }
)

const AppContainer = createAppContainer(rootStack)

export default class App extends Component {
  render(){
    return <AppContainer />;
  }
}
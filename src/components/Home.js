import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';



class HomeScreen extends Component {
    render() {
        return (
            <View>
            <Text>
                Ini adalah laman HomeScreen
            </Text>
            <TouchableOpacity 
                style={{padding: 10, backgroundColor:'#D0D0D0'}} 
                // navigate berfungsi untuk menambahkan stack didalam stackMavigator ita
                // kondisinya jika kita tambahkan button go to detail di dalam detail
                // dengan navigate saat di klik tidak akan menghasilkan apa-apa
                // karna kita sudha di dalam detail, dan saat kita back maka langsung
                // kembali ke halaman sebelumnya
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text>
                Login
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
  }


export default HomeScreen
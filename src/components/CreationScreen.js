import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'

export default class CreationScreen extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isModalVisible : false,
            myWebToon : [],
            token : '',
            userName : '',
            userId : ''
        }
    }


    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId'),
            // userToken : await "Bearer " + this.state.token
        } )
    }

    componentDidMount(){
        this.getMyCreation()
    }

    getMyCreation = async () => {
        await this.setItem()
        await console.log(this.state.userName)
        const config = {
            method : 'get',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }
        const getComic = await Axios('http://192.168.1.12:5000/api/v1/user/'+this.state.userName +'/wehtoons', config)
        await this.setState({
            myWebToon : getComic.data
        })
    }

    editWehToonHandler = async (id) => {
        this.props.navigation.navigate('EditWebToon', {comicId : id})
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View >
                        <View style={{borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", paddingHorizontal: 15}}  >
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> My WeH Toon </Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList 
                            data={this.state.myWebToon}
                            renderItem={({item}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}} onPress={() => this.editWehToonHandler(item.id)} >
                                <Image source={{uri : item.imgurl}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginHorizontal : 15}} >
                                    <Text style={{fontSize : 18}}>{item.title}</Text>
                                    <Text style={{color : '#717171'}}>Episode {item.ep} </Text>
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, width : 50, position : 'absolute',bottom : 50, right : 25,backgroundColor : 'white', borderRadius: 50 / 2, overflow: "hidden", borderWidth: 3, alignItems : "center"}} onPress={()=> this.props.navigation.navigate('ComicCreationScreen')} >
                    <FontAwesome5 name='plus' size={44} />
                </TouchableOpacity>
            </View>
        )
    }
  }
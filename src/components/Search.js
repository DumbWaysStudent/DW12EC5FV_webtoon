import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image, Button, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export default class Search extends Component{

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            token : '',
            userId : '',
            userName : '',
            imgurl : '',
            searchComic : '',
            searchQuery: ''
        }
    }

    getSearch = async () => {
        const config = {
            method : 'get',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                // "Authorization": "Bearer " + sessionStorage.getItem('jwt')
            }
        }

        const getSearchQuery = await Axios('http://192.168.1.12:5000/api/v1/wehtoons/search?title=' + this.props.navigation.getParam('query'), config)
        this.setState({
            searchComic : getSearchQuery.data
        })
    }

    componentDidMount(){
        this.getSearch()
    }

    handleDetailComic(id, comicTitle){
        this.props.navigation.navigate('Details', {comicId : id, title : comicTitle})
        console.log(this.state.userId)
    }

    handleSearch = async () => {
        const config = {
            method : 'get',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                // "Authorization": "Bearer " + sessionStorage.getItem('jwt')
            }
        }

        const getSearchQuery = await Axios('http://192.168.1.12:5000/api/v1/wehtoons/search?title=' + this.state.searchQuery, config)
        this.setState({
            searchQuery : '',
            searchComic : getSearchQuery.data,
        })
    }

    handleInputSearch(text){
        this.setState({
            searchQuery : text
        })
    }

    render(){
        return(
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex: 1,  marginBottom : 5, justifyContent : "center",}}>
                        <View style={{borderWidth : 2, borderColor : '#2a2b2b', borderRadius : 15, flexDirection : "row", alignItems : "center", height : 40, marginHorizontal : 20, marginTop : 5}}>
                            <View style={{flex : 1, fontSize : 16, marginLeft : 15, height : 40}} >
                                <TextInput onChangeText={(text) => this.handleInputSearch(text)} value={this.state.searchQuery} ></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => this.handleSearch()}>
                                <FontAwesome5 name="search" size={24} style={{color : 'lime', marginRight : 15}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                <View style={{flex: 13}}>

                    <FlatList
                        data = {this.state.searchComic}
                        renderItem = {({item}) => {
                            return(
                                <View style={{marginHorizontal : 20, marginTop : 10, borderColor : '#D0D0D0', borderWidth : 2, borderRadius : 5, flexDirection : 'row' }}>
                                    <TouchableOpacity style={{borderStyle : 'solid', borderWidth : 0.5, borderRadius : 5, width : 120, height : 120}} onPress={() => this.handleDetailComic(item.id, item.title)}>
                                        <Image source={{uri : item.imgurl}} style={{width : 119, height : 119, borderRadius : 5}} resizeMode='stretch'  />
                                    </TouchableOpacity>
                                    <View style={{flexDirection : "column",justifyContent : "center", flex : 1}}>
                                        <Text style={{marginVertical : 2, marginHorizontal : 5, fontSize : 25}}>{item.title}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                    
                </View>
                <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 31}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack')} >
                            <FontAwesome5 name="star" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack')}>
                            <FontAwesome5 name="user" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                
            </View>
        )
    }
}
import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'




class HomeScreen extends Component {


    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            interval : null,
            position : 1,
            banners : [],
            favorite : [],
            comic : [],
            userName : '',
            token : '',
            userId : '',
            userToken : '',
            searchQuery : '',
        }
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                position: this.state.position === this.state.banners.length ? 0 : this.state.position + 1,
                // cek login status
                isLogin : this.props.navigation.dangerouslyGetParent().getParam('isLogin')
                });
          }, 3000)
        });
      }
    
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId'),
        } )

    }

    async reqApi(){
        await this.setItem()
        // await console.log(this.state.)
        await axios.get('http://192.168.1.12:5000/api/v1/wehtoons')
            .then(res => {
                const comic = res.data;
                this.setState({ comic });
            })
            .catch(err => console.log(err))
            .finally(() => {
                for(var i = 1; i < 4; i++){
                    let obj ={}
                    obj['url'] = this.state.comic[i].imgurl
                    obj['title'] = this.state.comic[i].title
                    this.state.banners.push(obj)
                    console.log(i)
                }
        });
        await axios.get('http://192.168.1.12:5000/api/v1/wehtoons/favorite?userid=' + Number(this.state.userId), { 'headers': { 'Authorization': "Bearer " + this.state.token } })
            .then(res => {
                const favorite = res.data;
                this.setState({ favorite });
            })
            .catch(err => console.log(err))
    }

    componentDidMount(){
        this.reqApi()
    }


    handleDetailComic(id, comicTitle){
        this.props.navigation.navigate('Details', {comicId : id, title : comicTitle})
        console.log(this.state.userId)
    }

    handleFavorite(){
        this.props.navigation.navigate('favStack')
    }

    handleInputSearch(text){
        this.setState({
            searchQuery : text
        })
    }

    handleSearch(){
        this.props.navigation.navigate('Search', {query : this.state.searchQuery})
        this.setState({
            searchQuery : ''
        })
    }



    render() {

        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
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
                        <ScrollView>
                        <Slideshow 
                            dataSource={this.state.banners}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                            arrowSize={0}
                            titleStyle={{color : 'transparent'}}
                            />
                            <View style={{marginVertical : 15, }}>
                                <View style={{backgroundColor : '#D0D0D0' }}>
                                {/* Ini adalah option Favoritku */}
                                <Text style={{fontSize : 25, fontWeight : 'bold', color : '#4d4f4e', marginLeft : 20}}>Favoritku</Text>
                                {/* Berikut flatlits untuk merender gambar */}
                                <FlatList
                                    data={this.state.favorite}
                                    renderItem={({ item }) => {
                                    return (
                                    <View style={{marginVertical : 10, marginLeft : 20, borderColor : '#000', borderStyle : 'solid', borderWidth : 0.5, borderRadius : 5, width : 100, height : 120, alignItems : "center" }}>
                                        <TouchableOpacity onPress={() => this.handleDetailComic(item.id, item.title)}>
                                            <Image source={{uri : item.imgurl}} style={{width : 98, height : 80, borderRadius : 5}} resizeMode='stretch' />
                                        </TouchableOpacity>
                                        <Text style={{marginHorizontal : 5, fontSize : 15}}>{item.title}</Text>
                                    </View>)}}
                                    keyExtractor={item => item.title}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                                </View>
                                {/* Ini adalah option All */}
                                <Text style={{fontSize : 25, fontWeight : 'bold', color : '#4d4f4e', marginLeft : 20}}>ALL</Text>
                                <FlatList
                                    data={this.state.comic}
                                    renderItem={({ item, index }) => {
                                    return (
                                    
                                    <View style={{marginLeft : 20, marginTop : 10, borderColor : '#D0D0D0', flexDirection : 'row' }}>
                                        <TouchableOpacity style={{borderStyle : 'solid', borderWidth : 0.5, width : 120, height : 120}} onPress={() => this.handleDetailComic(item.id, item.title)}>
                                            <Image source={{uri : item.imgurl}} style={{width : 119, height : 119, }} resizeMode='stretch'  />
                                        </TouchableOpacity>
                                        <View style={{flexDirection : "column",justifyContent : "center", flex : 1}}>
                                            <Text style={{marginVertical : 2, marginHorizontal : 5, fontSize : 15}}>{item.title}</Text>
                                            <View style={{margin : 5,}}>
                                                <TouchableOpacity style={{backgroundColor : 'lime', padding : 10, width : '60%', justifyContent : 'center', alignItems : 'center', borderRadius : 5}}>
                                                    <Text style={{fontSize : 12, color : '#676b68'}}>+Favorite</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>)}}
                                    keyExtractor={item => item.title}
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 30}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack')}>
                            <FontAwesome5 name="heart" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.handleFavorite()}>
                            <FontAwesome5 name="star" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack', {favorite : this.state.favorite, comicList : this.state.comicList, isLogin : this.props.navigation.dangerouslyGetParent().getParam('isLogin'), userName : this.props.navigation.dangerouslyGetParent().getParam('userName'), url : this.props.navigation.dangerouslyGetParent().getParam('url') })} >
                            <FontAwesome5 name="user" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
  }


export default HomeScreen
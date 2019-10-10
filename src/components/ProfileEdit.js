import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class ProfileEdit extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isLogin : false,
            userName : ''
        }
    }

    componentWillMount(){
        this.props.navigation.dangerouslyGetParent().getParam('isLogin') == true ?
        this.setState({
            isLogin : true,
            userName : this.props.navigation.dangerouslyGetParent().getParam('userName')
        }) :
        this.setState({
            isLogin : false,
            userName : 'Ganti Nama'
        })
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View style={{flex: 1, marginBottom : 24}}>
                        <View style={{borderWidth : 2, borderColor : '#D0D0D0', flexDirection : "row", alignItems : "center", justifyContent : 'space-between', height : 60}}  >
                            <Text style={{fontSize : 24}}>Edit Profile</Text>
                            <TouchableOpacity>
                                <FontAwesome5 name="check" size={24} style={{color : '#D0D0D0', marginHorizontal : 10}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <View style={{ marginVertical : 15}}>
                            <Image source={{uri : 'https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png'}} style={{height : 105}} resizeMode='contain'/>
                            <View style={{ alignItems : "center", marginVertical : 15, padding : 5, flexDirection : 'row', borderColor : 'black', borderWidth : 1, borderStyle : 'solid'}}>
                                <TextInput placeholder={this.state.userName} style={{flex : 1, fontSize : 24}}></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 30}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList'), isLogin : this.state.isLogin, userName : this.state.userName})}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList'), isLogin : this.state.isLogin, userName : this.state.userName})} >
                            <FontAwesome5 name="star" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack')}>
                            <FontAwesome5 name="user" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
  }
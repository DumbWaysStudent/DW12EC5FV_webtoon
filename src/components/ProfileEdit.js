import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class ProfileEdit extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            userName : '',
            userNameUpdate : '',
            avatarSource : '',
            countMount : 0,
            url : 'https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png'
        }
    }

    componentDidUpdate(){
        this.state.countMount < 1 ?
        this.setState({
            userName : this.props.navigation.getParam('userName'),
            countMount : +1
        }) : null
        console.log('component did update editProfile', this.props.navigation.getParam('userName'))

    }

    handleChangeAvatar = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response.uri;
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                url: source,
              });
            }
        });
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                {console.log(this.state.userName)}
                {console.log('render')}
                <View style={{flex : 1}}>
                    <View style={{flex: 1, marginBottom : 24}}>
                        <View style={{borderWidth : 2, borderColor : '#D0D0D0', flexDirection : "row", alignItems : "center", justifyContent : 'space-between', height : 60}}  >
                            <Text style={{fontSize : 24}}>Edit Profile</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userNameEdited : this.state.userName, isEdited : true, url : this.state.url})}>
                                <FontAwesome5 name="check" size={24} style={{color : '#D0D0D0', marginHorizontal : 10}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <View style={{ marginVertical : 15, alignItems : 'center'}}>
                            <View >
                                <View style={{width: 150, height: 150,borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, }}>
                                    <Image source={{uri : this.state.url}} style={{height : 150}} resizeMode='stretch' />
                                </View>
                                <TouchableOpacity onPress={() => this.handleChangeAvatar()} style={{alignItems : 'center'}}>
                                    <FontAwesome5 name='camera' size={24} ></FontAwesome5>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems : "center", marginVertical : 15, padding : 5, flexDirection : 'row', borderColor : 'black', borderWidth : 1, borderStyle : 'solid'}}>
                                <TextInput placeholder={this.props.navigation.getParam('userName')} style={{flex : 1, fontSize : 24}} onChangeText={(text) => {this.setState({userName : text})}}></TextInput>
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
import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Choose Image',
    takePhotoButtonTitle : null,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class CreateEpisode extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isEditVisible : false,
            imageAdd : [],
            no : 1
        }
    }

    handleChangeAvatar = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.fileName);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              var obj = {}
              obj['title'] = 'Image ' + this.state.no
              obj['url'] = 'data:image/jpeg;base64,' + response.data
              this.state.imageAdd.push(obj)
              this.state.no += 1
              this.setState({
                imageAdd : this.state.imageAdd,
                no : this.state.no
              });
            }
        });
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View >
                        <View style={{borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", paddingHorizontal: 15, justifyContent : 'space-between'}}  >
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> Add Image </Text>
                            <TouchableOpacity >
                                <FontAwesome5 name='check' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontSize : 24, marginTop : 5, marginHorizontal : 10}}>Title</Text>
                    <View style={{height : 50, borderColor : 'black', borderWidth : 1, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center'}}>
                        <TextInput placeholder='Title' style={{width : '100%', height : 70, fontSize : 24}} />
                    </View>
                    <View style={{flex: 1, marginBottom : 80}}>
                        <FlatList 
                            data={this.state.imageAdd}
                            renderItem={({item}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}}>
                                <Image source={{uri : item.url}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginHorizontal : 15}} >
                                    <Text style={{fontSize : 18}}>{item.title}</Text>
                                    <Text style={{color : '#717171'}}>Episode {item.ep} </Text>
                                    {
                                        this.state.isEditVisible == true ? 
                                        <TouchableOpacity style={{backgroundColor : '#85eb2d', padding : 5, borderRadius :10, width : 100}}>
                                            <Text>+Add Episode</Text>
                                        </TouchableOpacity> : null
                                    }
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.handleChangeAvatar()}>
                    <Text>Add Image + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
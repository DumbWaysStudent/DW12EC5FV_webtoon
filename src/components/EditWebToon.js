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

export default class EditWebToon extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isEditVisible : false,
            imageAdd : [
            {
                ep : 1,
                url : 'https://swebtoon-phinf.pstatic.net/20180421_269/1524270316069kkN5z_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                ep : 2,
                url : 'https://swebtoon-phinf.pstatic.net/20150409_113/14285729559588eQUu_JPEG/EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                ep : 3,
                url : 'https://swebtoon-phinf.pstatic.net/20150910_74/14418733461392XSwh_JPEG/_EB93BBEB80AF_EBA38CEABCA5_E29587EABCB1_EB9384EB84B0_ipa.jpg'
            }, {
                ep : 4,
                url : 'https://swebtoon-phinf.pstatic.net/20160408_183/1460116907063qmNYD_JPEG/EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                ep : 5,
                url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowh3MiTMolMGlNAwKjTt10_ugN5Yw_FyrCBJDNEyV7XU9ivsj'
            }, {
                ep : 6,
                url : 'https://swebtoon-phinf.pstatic.net/20150515_169/1431694184798zYYRO_JPEG/510.jpg'
            }, {
                ep : 7,
                url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Yfi0_-ByHOcXrDRC-JQ7wdn7_Ug1FZCheJJgWbiX4wdQZXAx'
            }, {
                ep : 8,
                url : 'https://swebtoon-phinf.pstatic.net/20161006_238/1475757055763l1sqp_JPEG/thumb_ipad.jpg'
            }, {
                ep : 9,
                url : 'https://swebtoon-phinf.pstatic.net/20190124_111/1548319240514DXnqg_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }
            ]
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
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              var obj = {}
              var len = this.state.imageAdd.length - 1
              obj['ep'] = this.state.imageAdd[len].ep + 1
              obj['url'] = 'data:image/jpeg;base64,' + response.data
              this.state.imageAdd.push(obj)
              this.state.imageAdd
              this.setState({
                imageAdd : this.state.imageAdd,
              });
            }
        });
    }

    handleRemove = (index) => {
        this.state.imageAdd.splice(index, 1)
        this.setState({
            imageAdd : this.state.imageAdd
        })
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
                            <Text style={{fontSize: 28}}> Edit WebToon </Text>
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
                            renderItem={({item, index}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}}>
                                <Image source={{uri : item.url}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginHorizontal : 15}} >
                                    <Text style={{fontSize : 18}}>{item.title}</Text>
                                    <Text style={{color : '#717171'}}>Episode {item.ep} </Text>
                                    <TouchableOpacity style={{backgroundColor : '#eb302d', padding : 5, borderRadius :5, width : 100}} onPress={() => this.handleRemove(index)} >
                                        <Text>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.handleChangeAvatar()}>
                    <Text>Add Episode + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
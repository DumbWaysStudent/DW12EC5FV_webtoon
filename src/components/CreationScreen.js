import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class CreationScreen extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isModalVisible : false,
            myWebToon : [{
                title : 'God Of HighSchool',
                ep : 27,
                url : 'https://swebtoon-phinf.pstatic.net/20180205_49/1517820810054nBc8X_JPEG/thumb_ipad.jpg'
            }, {
                title : 'Stranger From Hell',
                ep : 19,
                url : 'https://swebtoon-phinf.pstatic.net/20190830_275/1567155943013P5ABB_JPEG/_ipad.jpg'
            }, {
                title : 'Save Me',
                ep : 8,
                url : 'https://swebtoon-phinf.pstatic.net/20190116_292/1547605944791X4yhV_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                title : 'UnOrdinary',
                ep : 13,
                url : 'https://swebtoon-phinf.pstatic.net/20190111_246/1547145672832qC9wR_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                title : 'God Of HighSchool',
                ep : 27,
                url : 'https://swebtoon-phinf.pstatic.net/20180205_49/1517820810054nBc8X_JPEG/thumb_ipad.jpg'
            }, {
                title : 'Stranger From Hell',
                ep : 19,
                url : 'https://swebtoon-phinf.pstatic.net/20190830_275/1567155943013P5ABB_JPEG/_ipad.jpg'
            }, {
                title : 'Save Me',
                ep : 8,
                url : 'https://swebtoon-phinf.pstatic.net/20190116_292/1547605944791X4yhV_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                title : 'UnOrdinary',
                ep : 13,
                url : 'https://swebtoon-phinf.pstatic.net/20190111_246/1547145672832qC9wR_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }]
        }
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
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}}>
                                <Image source={{uri : item.url}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
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
                <TouchableOpacity style={{height : 50, width : 50, position : 'absolute',bottom : 50, right : 25,backgroundColor : 'white', borderRadius: 50 / 2, overflow: "hidden", borderWidth: 3, alignItems : "center"}} onPress={()=> this.props.navigation.navigate('CreationScreenDetails')} >
                    <FontAwesome5 name='plus' size={44} />
                </TouchableOpacity>
            </View>
        )
    }
  }
import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';

export default class CreationScreen extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isAddVisible : false,
            isEditVisible : false,
            myWebToon : [
                {
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
                        <View style={{borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", paddingHorizontal: 15, justifyContent : 'space-between'}}  >
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> Create WeHToon </Text>
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
                            data={this.state.myWebToon}
                            renderItem={({item}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}}>
                                <Image source={{uri : item.url}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginHorizontal : 15}} >
                                    <Text style={{fontSize : 18}}>{item.title}</Text>
                                    <Text style={{color : '#717171'}}>Episode {item.ep} </Text>
                                    {
                                        this.state.isAddVisible == true ? 
                                        <TouchableOpacity style={{backgroundColor : '#85eb2d', padding : 5, borderRadius :10, width : 100}} onPress={() => this.props.navigation.navigate('CreateEpisode')} >
                                            <Text>+Add Episode</Text>
                                        </TouchableOpacity> : null
                                    }
                                    {
                                        this.state.isEditVisible == true ?
                                        <TouchableOpacity style={{backgroundColor : '#eb302d', padding : 5, borderRadius :5, width : 100, alignItems : 'center'}} onPress={() => this.props.navigation.navigate('EditWebToon')} >
                                            <Text>Edit</Text>
                                        </TouchableOpacity> : null
                                    }
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.state.isAddVisible ? this.setState({isAddVisible : false, isEditVisible : false}) : this.setState({isAddVisible : true, isEditVisible : false})}>
                    <Text>Add Episode + </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 90, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.state.isEditVisible ? this.setState({isAddVisible : false, isEditVisible : false}) : this.setState({isAddVisible : false, isEditVisible : true})}>
                    <Text>Edit Episode + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
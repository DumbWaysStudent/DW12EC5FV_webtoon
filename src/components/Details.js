import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import axios from "axios"

export default class Details extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isModalVisible : false,
            comicChapter : []
        }
    }

    async fatchData(){
        await axios.get('http://192.168.1.12:5000/api/v1/wehtoons/' + this.props.navigation.getParam('comicId') + '/episodes')
        .then(res => {
            console.log('http://192.168.12.12:5000/api/v1/wehtoons/' + this.props.navigation.getParam('comicId') + '/episodes')
            const comicChapter = res.data;
            this.setState({ comicChapter });
        })
        .catch(err => console.log(err))
        await console.log("hello" + this.state.comicChapter)
    }

    componentDidMount(){
        console.log('http://192.168.12.12:5000/api/v1/wehtoons/' + this.props.navigation.getParam('comicId') + '/episodes')
        this.fatchData()
    }

    handleChapterPages = (comicId, chapterId, title) => {
        this.props.navigation.navigate('EpisodeDetails', {comicId, chapterId, title})
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View >
                    <Modal isVisible={this.state.isModalVisible} style={{backgroundColor : 'white', flex  : 1}} >
                            <View style={{flex: 1}}>
                                <TouchableOpacity onPress={() => this.setState({isModalVisible : false})}>
                                    <Text>Closed</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 9, alignItems : 'center', justifyContent : 'center', flexDirection : 'row'}}>
                                <TouchableOpacity>
                                    <FontAwesome5 name='telegram' size={80} style={{color : '#0088cc', paddingHorizontal : 15}} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FontAwesome5 name='whatsapp' size={80} style={{color : '#075e54', paddingHorizontal : 15}} />
                                </TouchableOpacity>
                            </View>
                    </Modal>
                </View>
                <View style={{flex : 1}}>
                    <View >
                        <View style={{borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", justifyContent: 'space-between', paddingHorizontal: 15}}  >
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> {this.props.navigation.getParam('title')} </Text>
                            <TouchableOpacity onPress={() => this.setState({isModalVisible : true})}>
                                <FontAwesome5 name='share-alt' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{alignItems : "center"}}>
                                <Image source={{uri : this.props.navigation.getParam('url')}} style={{width : 250, height : 250, borderRadius : 5}} />
                            </View>
                            <View style={{backgroundColor : '#ebebeb', paddingVertical : 5}}>
                                <Text style={{fontSize : 24}}>Klik Untuk Membaca</Text>
                                {console.log(this.props.navigation.getParam('episode'))}
                            </View>

                            {/* Untuk menampilkan chapter comic */}
                            <FlatList
                                data={this.state.comicChapter}
                                renderItem={({ item }) =>{
                                    return(
                                    <TouchableOpacity style={{flexDirection : 'row', borderWidth : 0.5, borderStyle : 'solid', borderColor : '#ebebeb'}} onPress={() => this.handleChapterPages(item.comic, item.chapterId, item.titleEpisodes)} >
                                        <Image source={{uri : item.imgurl}} style={{width : 100, height : 100, borderRadius : 5}} />
                                        <View style={{justifyContent : 'center', paddingLeft : 15}}>
                                            <Text style={{fontSize : 18}}>{ item.titleEpisodes }</Text>
                                            <View style={{flexDirection : "row", }}>
                                                <TouchableOpacity>
                                                    <FontAwesome5 name='heart' size={18} />
                                                </TouchableOpacity>
                                                <Text>{item.like}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                }}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
  }
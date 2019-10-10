import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";

export default class EpisodeDetails extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isModalVisible : false
        }
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
                <View >
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
                </View>
                <View style={{flex : 1}}>
                    <ScrollView>
                        <FlatList 
                            data={this.props.navigation.getParam('episodDetails')}
                            renderItem={({item}) => {
                                return(
                                    <View>
                                        <Image source={{uri : item.url}} style={{width : '100%', height : 1200}} />
                                    </View>
                                )
                            }}
                        />
                        {console.log(this.props.navigation.getParam('episodDetails'))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
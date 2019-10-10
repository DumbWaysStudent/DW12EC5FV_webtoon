import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Favorite extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width}
        }

    render(){
      return (
        <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View style={{flex: 1,  marginBottom : 24}}>
                        <View style={{borderWidth : 2, borderColor : '#D0D0D0', flexDirection : "row", alignItems : "center", height : 60}}>
                            <TextInput style={{flex : 1, fontSize : 24,}}></TextInput>
                            <FontAwesome5 name="search" size={24} style={{color : '#D0D0D0',}} />
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <FlatList
                            data={this.props.navigation.dangerouslyGetParent().getParam('favorite')}
                            renderItem={({ item }) => {
                                return(
                                    <View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details' , {episode : this.props.navigation.dangerouslyGetParent().getParam('comicList'), url : item.url})} style={{flexDirection : 'row', borderWidth : 0.5, borderStyle : 'solid', borderColor : '#ebebeb'}} >
                                            <Image source={{ uri : item.url}} style={{width : 100, height : 100, borderRadius : 5}} />
                                            <View style={{justifyContent : 'center', paddingLeft : 15}}>
                                                <Text style={{fontSize : 24, fontWeight : 'bold'}}> {item.title} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 30}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack')}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack')}>
                            <FontAwesome5 name="star" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList')})}>
                            <FontAwesome5 name="user" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      )
    }
  }
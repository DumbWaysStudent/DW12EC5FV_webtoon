import React, { Component } from 'react'
import { Image, View, Button, FlatList, TextInput, Text } from 'react-native'

import { connect } from 'react-redux'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { API } from '../config/API'

import ReduxSendBoxTwo from './ReduxSendBoxTwo'

class ReduxSend extends Component {

    // constructor(){
    //     super()
    //     this.state = {
    //         banner : [],
    //         username : '',
    //         password : ''
    //     }
    // }

    componentDidMount(){
        this.props.dispatch({type : 'GET_MANGA', payload : Axios.get(`${API}/api/v1/wehtoons`)})
    }

    render(){

        return(
            <View>
                <Text>hELLO</Text>
                <Button title="Log Me" onPress={() => console.log(this.props.fav)} ></Button>
                <FlatList
                data={this.props.fav}
                renderItem={({item}) => 
                    <View>
                        <Image source={{uri: item.imgurl}} style={{height : 100, width: 100}} />
                    <Text>Test</Text>
                    </View>
                }
                 />
                 {console.log("log from Render")}
            </View>
        )
    }
}

const mapstatetoprop = state => ({
    fav : state.manga.data
})

export default connect(mapstatetoprop)(ReduxSend)

// export default connect(mapstatetoprop)(ReduxSend)


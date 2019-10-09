import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




class HomeScreen extends Component {


    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            interval : null,
            position : 1,
            banners : [{
                title: 'Save Me',
                url: 'https://pbs.twimg.com/media/DxE_lKFUUAA6h-a.jpg'
              }, {
                title: 'Pasutri Gaje',
                url: 'https://3.bp.blogspot.com/-DZA0DTCWPlk/XM4zp5rf4CI/AAAAAAAAApk/gwJBzi0DPMwOl6rOBHpue_TXbnB0_0AGwCLcBGAs/w1200-h630-p-k-no-nu/Pasutri%2BGaje%2BSeason%2B2%2BAnissa%2BNisfihani%2BWebtoon%2BIndonesia.JPG'
              }, {
                title: 'Young Mom',
                url: 'https://i.ytimg.com/vi/lNQmRkzCYNk/maxresdefault.jpg'
              }],
            favorite : [{
                title : 'My Pre-Weeding',
                url : 'https://swebtoon-phinf.pstatic.net/20151204_153/1449224910514foxUo_JPEG/thumbnail_ipad.jpg'
            }, {
                title : 'Change',
                url : 'https://swebtoon-phinf.pstatic.net/20181018_194/1539851046300HG3M3_JPEG/thumb_ipad.jpg'
            }, {
                title : 'Untouchable',
                url : 'https://swebtoon-phinf.pstatic.net/20140710_240/1404980084194ATjbR_JPEG/19_EC96B8ED84B0ECB298EBB894.jpg'
            }, {
                title : 'Flawless',
                url : 'https://swebtoon-phinf.pstatic.net/20190604_285/15596413468052196d_JPEG/thumb_ipad.jpg'
            }, {
                title : 'Alice',
                url : 'https://swebtoon-phinf.pstatic.net/20171018_290/1508298021845pmkUU_JPEG/thumb_ipad.jpg'
            }],
            suggest : [{
                title : 'Purple Hyacith',
                url : 'https://swebtoon-phinf.pstatic.net/20190522_118/1558463010991CibkK_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
            }, {
                title : 'Hell Phone',
                url : 'https://swebtoon-phinf.pstatic.net/20190328_258/1553714534269vAMeR_JPEG/thumbnail.jpg'
            }, {
                title : 'Anti Stalker',
                url : 'https://swebtoon-phinf.pstatic.net/20190501_79/1556712664332rz1Ag_JPEG/thumbnail.jpg'
            }, {
                title : 'Stranger From Hell',
                url : 'https://swebtoon-phinf.pstatic.net/20180904_286/15360592406717mhMz_JPEG/thumb_ipad.jpg',
                
            }],
            comicList : [{
                title : 'Ep.1 Pembukaan',
                url : 'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg',
                like : '1892'
            }, {
                title : 'Ep.2 Pembukaan ke 2',
                url : 'https://s3-ap-southeast-1.amazonaws.com/mia.doripos.com/melia/2018/03/f9a81b3d-suka-suka-suka-suka.jpg',
                like : '1236'
            }, {
                title : 'Ep.3 Pembukaan ke 3',
                url : 'https://swebtoon-phinf.pstatic.net/20180404_12/1522767631024uBHrp_JPEG/thumb_ipad.jpg',
                like : '824'
            }, {
                title : 'Ep.4 Pembukaan ke 4',
                url : 'https://swebtoon-phinf.pstatic.net/20140710_240/1404980084194ATjbR_JPEG/19_EC96B8ED84B0ECB298EBB894.jpg',
                like : '200'
            }]
        }
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                position: this.state.position === this.state.banners.length ? 0 : this.state.position + 1
                });
          }, 3000)
        });
      }
    
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    
    imageArr = () => {
        let arr = []
        this.state.banners.map(
            (el) => {
                arr.push(el.image);
            }
        )
        return arr;
    }

    render() {

        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View style={{flex: 1,}}>
                        <View style={{borderWidth : 2, borderColor : '#D0D0D0', flexDirection : "row", alignItems : "center"}}>
                            <TextInput style={{flex : 1}}></TextInput>
                            <FontAwesome5 name="search" size={24} style={{color : '#D0D0D0', marginHorizontal : 10}} />
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <ScrollView>
                        <Slideshow 
                            dataSource={this.state.banners}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                            arrowSize={0}
                            titleStyle={{color : 'transparent'}}
                            />
                            <View style={{marginVertical : 5, }}>
                                {/* Ini adalah option Favoritku */}
                                <Text style={{fontSize : 22, fontWeight : 'bold', color : '#4d4f4e', marginLeft : 5}}>Favoritku</Text>
                                {/* Berikut flatlits untuk merender gambar */}
                                <FlatList
                                    data={this.state.favorite}
                                    renderItem={({ item }) => {
                                    return (
                                    <View style={{margin : 5, borderColor : '#D0D0D0', borderStyle : 'solid', borderWidth : 0.5, borderRadius : 5 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {url : item.url, title : item.title, episode : this.state.comicList})}>
                                            <Image source={{uri : item.url}} style={{width : 150, height : 150, borderRadius : 5}} resizeMode='contain'/>
                                        </TouchableOpacity>
                                        <Text style={{marginVertical : 10, marginHorizontal : 5}}>{item.title}</Text>
                                    </View>)}}
                                    keyExtractor={item => item.title}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />

                                {/* Ini adalah option All */}
                                <Text style={{fontSize : 22, fontWeight : 'bold', color : '#4d4f4e', marginBottom : 5, marginLeft : 5}}>ALL</Text>
                                <FlatList
                                    data={this.state.suggest}
                                    renderItem={({ item }) => {
                                    return (
                                    <View style={{margin : 5, borderColor : '#D0D0D0', flexDirection : 'row' }}>
                                        <TouchableOpacity style={{borderStyle : 'solid', borderWidth : 0.5, }} onPress={() => this.props.navigation.navigate('Details', {url : item.url, title : item.title, episode : this.state.comicList})}>
                                            <Image source={{uri : item.url}} style={{width : 150, height : 150, }} resizeMode='contain'  />
                                        </TouchableOpacity>
                                        <View style={{flexDirection : "column",justifyContent : "center", flex : 1}}>
                                            <Text style={{marginVertical : 2, marginHorizontal : 5}}>{item.title}</Text>
                                            <View style={{margin : 5,}}>
                                                <TouchableOpacity style={{backgroundColor : 'lime', padding : 10, width : '60%', justifyContent : 'center', alignItems : 'center', borderRadius : 5}}>
                                                    <Text style={{fontSize : 12, color : '#676b68'}}>+Favorite</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>)}}
                                    keyExtractor={item => item.title}
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 30}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack')}>
                            <FontAwesome5 name="heart" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack')}>
                            <FontAwesome5 name="star" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack')}>
                            <FontAwesome5 name="user" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
  }


export default HomeScreen
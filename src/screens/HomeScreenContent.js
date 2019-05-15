import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Alert,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Linking,

} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Card, ListItem, Divider } from 'react-native-elements';
import Moment from 'react-moment';

import LoginScreenContent from './LoginScreenContent';
import { createStackNavigator, createAppContainer, StackNavigator, navigate, StackActions, NavigationActions, NavigationEvents } from 'react-navigation';

export default class HomeScreenContent extends React.Component {


    constructor(props) {
        super(props)
        this.titleInput = React.createRef();
        this.descInput = React.createRef();
        this.state = {
            TextInputTitle: '',
            TextInputDesc: '',
            refreshing: false,
            isLoading: true,
            dataSource: null,
            loggedin: false,

        }
    }

    async componentDidMount() {

        let testValue = 1;
        let value = await AsyncStorage.getItem('id');
        if (value != null) {

            this.setState({

                loggedin: true,
                storageEmail: await AsyncStorage.getItem('email'),
                storageName: await AsyncStorage.getItem('name'),
                storagePic: await AsyncStorage.getItem('pic_url'),
                storageId: await AsyncStorage.getItem('id'),
            });

            //console.warn(this.state.name);

        }
        else {
            this.setState({

                loggedin: false,
                storageId: await AsyncStorage.getItem('id'),
            });

        }

        return fetch('https://grudnik-projekti.eu/api/motorhomes')
            .then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                })

            })
            .catch((error) => {
                console.log(error)
            });
    }
    /*
        InsertDataToServer = () => {
    
            const Title = this.state.TextInputTitle;
            const Desc = this.state.TextInputDesc;
    
            fetch('//', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newsTitle: Title,
                    newsDescription: Desc
                })
    
            }).then((response) => response.json())
                .then((responseJson) => {
                    // Showing response message coming from server after inserting records.
                    Alert.alert(responseJson);
                }).catch((error) => {
                    console.error(error);
                });
    
            this.titleInput.current.clear();
            this.descInput.current.clear();
    
        }
        */
    goOnRent() {
        this.props.navigation.navigate('Rent');
    }

    handleRefresh() {
        this.componentDidMount();

        this.setState({
            refreshing: false
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            )
        } else {

            let data = this.state.dataSource.map((val, key) => {

                return (

                    <View key={key} style={styles.items}>
                        <Text h1 style={styles.title}>{val.model.name}</Text>
                        <Image source={{ uri: val.url }}
                            style={styles.image} />
                        <Text style={{ opacity: 0 }}> {val.id}</Text>
                        <Text style={styles.desc}>Price: {val.price} EUR /Per day</Text>
                        <Text style={styles.desc}>Beds: {val.beds}</Text>
                        <Text style={styles.desc}>Description: {val.description}</Text>
                        <Text style={styles.desc}>Owner: {val.user.name}</Text>
                        <Moment element={Text} format="HH:mm DD.MM.YYYY">{val.updated_at}</Moment>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Motorhome',
                            {
                                id: val.id,
                                model: val.model.name,
                                beds: val.beds,
                                description: val.description,
                                url: val.url,
                                price: val.price,
                                user: val.user.name,

                            })}>
                            <Text style={styles.TextStyle}>VIEW</Text>
                        </TouchableOpacity>
                        {this.state.loggedin ?
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Rent',
                                {
                                    id: val.id,
                                    model: val.model.name,
                                    beds: val.beds,
                                    description: val.description,
                                    url: val.url,
                                    price: val.price,
                                    user: val.user.name,

                                })}>
                                <Text style={styles.TextStyle}>RENT</Text>
                            </TouchableOpacity>
                            /*
                             <TouchableOpacity
                                 onPress={() => this.goOnRent()}
                                 style={styles.button}
                             >
                                 <Text style={styles.TextStyle}>Rent</Text>
                             </TouchableOpacity> */
                            : null}


                    </View >




                )

            })
                ;

            return (

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.handleRefresh()}
                            refreshing={this.state.refreshing}
                        />
                    }
                >

                    <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                    {this.state.loggedin ?
                        <View style={styles.userInfo}>
                            <Image source={{ uri: 'https://grudnik-projekti.eu/storage/profile_pictures/' + this.state.storagePic }}
                                style={styles.profileimg} />
                            <Text>You are logged in as: {this.state.storageName} </Text>
                            <Text>Email: {this.state.storageEmail} </Text>

                        </View> : null}
                    <View style={styles.MainContainer}>


                        {data}

                    </View>

                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    items: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 50,
        marginRight: '5%',
        marginLeft: '5%',
        width: '90%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        paddingLeft: 40,
        paddingRight: 40,


    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,


    },
    desc: {
        fontSize: 14,

    },
    image: {
        width: 270, height: 200,
        marginTop: 20,


    },
    userInfo: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },

    profileimg: {
        borderRadius: 15,
        width: 50, height: 50,

    }
    ,
    button: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 7,
        margin: 10,
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },


});
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
    Button,
    ActivityIndicator,
    RefreshControl,
    AsyncStorage,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, List, ListItem } from 'native-base';
import Moment from 'react-moment';

export default class MyRents extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoading: true,
            loggedin: true,
            dataSource: null,
            datestart: '',
            datestop: '',
            id: '',
            storageId: '',
            nipod: false,

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
            // 
        }
        var { handle } = this.state.storageId;
        const requestURL = `https://grudnik-projekti.eu/api/users/${this.state.storageId}`;

        return fetch(requestURL)
            .then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data.rents,
                })

            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    nipod: true,

                })
                console.log(error)
            });
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
            if (typeof this.state.dataSource == 'undefined') {

                return (<View style={styles.container}>
                    <Text>Ni rezervacij za prikaz </Text>
                </View>)
            }
            else {


                let data = this.state.dataSource.map((val, key) => {

                    return (

                        <View key={key} style={styles.items}>
                            <Text style={styles.title}>Motorhomes: {val.model.name} </Text>
                            <Text style={styles.desc}>Rent start:</Text>
                            <Moment element={Text} format="DD.MM.YYYY">{val.rent_start}</Moment>
                            <Text style={styles.desc}>Rent stop: </Text>
                            <Moment element={Text} format="DD.MM.YYYY">{val.rent_end}</Moment>
                            <Text style={styles.desc}>Rented on: </Text>
                            <Moment element={Text} format="HH:mm DD.MM.YYYY">{val.updated_at}</Moment>


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

                        <View style={styles.MainContainer}>


                            {data}

                        </View>

                    </ScrollView>
                );
            }
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
        marginTop: 20,
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

    button: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: 'black',
        padding: 2,
        textAlign: 'left',
        fontWeight: 'bold',

    },
    profileimg: {
        borderRadius: 15,
        width: 50, height: 50,

    },
    image: {
        width: 270, height: 200,
        marginTop: 20,



    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',


    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },


});
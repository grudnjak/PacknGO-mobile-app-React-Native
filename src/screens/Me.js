import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    renderIf,
    Image,
    Linking
} from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator, navigate, StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
import { Divider } from 'react-native-elements';

export default class Me extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            name: 'X',
            email: 'x',
            storageName: '',
            dataSource: null,

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

            return fetch('https://grudnik-projekti.eu/api/users/' + this.state.storageId)
                .then((response) => response.json())
                .then(async (responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    })

                })
                .catch((error) => {
                    console.log(error)
                });

        }


    }



    //Navigation
    goOnLogin() {
        this.props.navigation.navigate('Login');
    }

    goOnRegister() {
        this.props.navigation.navigate('Register');
    }


    handleRefresh() {
        this.componentDidMount();

        this.setState({
            refreshing: false
        })
    }

    logoutFunction = async () => {
        AsyncStorage.clear();
        AsyncStorage.setItem('id', '');
        this.setState({
            loggedin: false,
            name: 'X',
        });

        this.componentDidMount();

    }




    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            )
        } else {


            return (
                < ScrollView >

                    <NavigationEvents onDidFocus={() => this.componentDidMount()} />

                    {
                        this.state.loggedin != true ?
                            <View style={styles.container}>
                                <Image
                                    source={require('../../images/logoPnG.png')}
                                    style={{ width: 150, height: 150, marginBottom: 15 }}
                                />

                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={styles.TextStyle} >Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('About')}>
                                    <Text style={styles.TextStyle} >About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Contact')}>
                                    <Text style={styles.TextStyle} >Contact</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                                    <Text style={styles.TextStyle} >Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                                    <Text style={styles.TextStyle} >Register</Text>
                                </TouchableOpacity>
                            </View> : null
                    }

                    {
                        this.state.loggedin ?
                            <View style={styles.container}>
                                <Image source={{ uri: 'https://grudnik-projekti.eu/storage/profile_pictures/' + this.state.storagePic }}
                                    style={styles.profileimg} />
                                <Text>You are logged in as: {this.state.storageName} </Text>
                                <Text>Email: {this.state.storageEmail} </Text>

                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={styles.TextStyle} >Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('About')}>
                                    <Text style={styles.TextStyle} >About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Contact')}>
                                    <Text style={styles.TextStyle} >Contact</Text>
                                </TouchableOpacity>
                                <Divider style={styles.devider} />
                                <Text style={styles.profile}> My profile options</Text>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MyMotorhomes')}>
                                    <Text style={styles.TextStyle}>My Motorhomes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MyRents')}>
                                    <Text style={styles.TextStyle}>My Rents</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MotorhomeAdd')}>
                                    <Text style={styles.TextStyle}>Add motorhome</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={this.logoutFunction}
                                    style={styles.button}
                                >

                                    <Text style={styles.TextStyle}> Log Out </Text>
                                </TouchableOpacity>



                            </View> : null
                    }



                </ScrollView >
            );


        }
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },

    button: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: 'white',
        textAlign: 'center',
        TextStyle: 'bold',
        padding: 10
    },
    profileimg: {
        borderRadius: 15,
        width: 50, height: 50,

    },
    profile: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 10,
    },
    devider:
    {
        height: 1,
        backgroundColor: '#e1e8ee'
    }


});
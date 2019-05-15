import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
    Button
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, List, ListItem } from 'native-base';


export default class MotorhomeScreenContent extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            loggedin: true,
            dataSource: null,
            datestart: '',
            datestop: '',
            id: '',


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
    }





    handleRefresh() {
        this.componentDidMount();

        this.setState({
            refreshing: false
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null;
        const model = params ? params.model : null;
        const beds = params ? params.beds : null;
        const description = params ? params.description : null;
        const url = params ? params.url : null;
        const user = params ? params.user : null;
        const price = params ? params.price : null;

        return (

            <View style={styles.container}>
                <Text h1 style={styles.title}>{model}</Text>
                <Image source={{ uri: url }}
                    style={styles.image} />
                <Text style={{ opacity: 0 }}> {id}</Text>


                <List>
                    <ListItem itemHeader first>
                        <Text>DETAILS</Text>
                    </ListItem>
                    <ListItem >
                        <Text>Price {price}EUR /Per day</Text>
                    </ListItem>
                    <ListItem >
                        <Text>Beds: {beds}</Text>
                    </ListItem>
                    <ListItem >
                        <Text>Description: </Text>
                    </ListItem>
                    <ListItem last>
                        <Text>{description}</Text>
                    </ListItem>
                    <ListItem itemHeader>
                        <Text>OWNER</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>{user}</Text>
                    </ListItem>
                </List>

            </View>

        )
    }





}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',

        paddingTop: 20,

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

});
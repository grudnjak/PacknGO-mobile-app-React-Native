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
    Alert,
    AsyncStorage,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DatePicker from 'react-native-datepicker'


export default class RentScreenContent extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.RentFunction = this.RentFunction.bind(this);
        this.state = {

            loggedin: true,
            dataSource: null,
            datestart: '',
            datestop: '',
            storageId: '',
            mid: null,




        }
    }

    RentFunction = async () => {


        fetch('https://grudnik-projekti.eu/api/rent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                rent_start: this.state.datestart,
                rent_end: this.state.datestop,
                m_id: this.state.mid,
                u_id: this.state.storageId,

            })

        }).then((response) => response.json())
            .then(async (response) => {



                // If server response message same as Data Matched
                if (response.data === "Success") {

                    Alert.alert("RENTED");
                    this.props.navigation.navigate('MyRents');


                }


                else {

                    Alert.alert("Incorecct date or date already rented. Try Again!");




                }

            }).catch((error) => {
                console.error(error);
            });

        this.datestart.current.clear();
        this.datestop.current.clear();
    }


    async componentDidMount() {


        let value = await AsyncStorage.getItem('id');
        if (value != null) {

            this.setState({

                loggedin: true,
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
        const url = params ? params.url : null;
        const user = params ? params.user : null;
        const price = params ? params.price : null;


        return (
            <View style={styles.container}>
                <Text h1 style={styles.title}>{model}</Text>
                <Image source={{ uri: url }}
                    style={styles.image} />
                <Text style={{ opacity: 0 }}> {id}</Text>
                <Text style={styles.desc}>Price:  {price}EUR /Per day</Text>
                <Text style={styles.desc}>Owner: {user}</Text>
                <Text>Rent start:</Text>
                <DatePicker
                    style={{ width: 300 }}
                    date={this.state.datestart}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2019-04-01"
                    maxDate="2099-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }

                    }}
                    onDateChange={(datestart) => { this.setState({ datestart: datestart }) }}
                />
                <Text>Rent stop:</Text>
                <DatePicker
                    style={{ width: 300 }}
                    date={this.state.datestop}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2019-04-01"
                    maxDate="2099-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }

                    }}
                    onDateChange={(datestop) => { this.setState({ datestop: datestop, mid: id }) }}
                />


                <Button title="Rent" onPress={this.RentFunction} color="#2196F3" />
            </View>
        )
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
        color: '#fff',
        textAlign: 'center',
        padding: 10
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


    },

});
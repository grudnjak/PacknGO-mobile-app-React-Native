import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    Alert,
    forceRemount,
    Image,
    Dropdown,
    Picker,
    ActivityIndicator
} from 'react-native';

// Importing Stack Navigator library to add multiple activities.
import { createStackNavigator } from 'react-navigation';
import { ThemeConsumer } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';




export default class MotorhomeAdd extends React.Component {

    constructor(props) {

        super(props)
        this.MotorhomeAddFunction = this.MotorhomeAddFunction.bind(this);
        this.state = {
            description: '',
            beds: null,
            model_id: null,
            price: null,
            user_id: 0,
            imageSource: null,
            image: '',
            imgBase: '',
            storageId: null,
            PickerValueHolder: '',
            isLoading: true,
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
                user_id: await AsyncStorage.getItem('id'),
            });

            //console.warn(this.state.name);

        }
        else {
            this.setState({

                loggedin: false,
                storageId: await AsyncStorage.getItem('id'),
            });

        }


        return fetch('https://grudnik-projekti.eu/api/models')
            .then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                    //nelki nabej
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }




    MotorhomeAddFunction = async () => {




        fetch('https://grudnik-projekti.eu/api/motorhome', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({


                model_id: this.state.PickerValueHolder,
                user_id: this.state.user_id,
                desc: this.state.description,
                price: this.state.price,
                beds: this.state.beds,
                picture: this.state.imgBase,

            })

        }).then((response) => response.json())
            .then(async (response) => {



                // If server response message same as Data Matched
                if (response.data === "Success") {

                    Alert.alert("Motorhome added");
                    this.props.navigation.navigate('Home');


                }


                else {

                    Alert.alert("Incorecct data. Try Again!");



                }

            }).catch((error) => {
                console.log(error)
            });

        this.PickerValueHolder.current.clear();
        this.description.current.clear();
        this.beds.current.clear();
        this.price.current.clear();
        this.price.imgBases.clear();


    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            allowsEditing: true,
            base64: true,
        });
        if (!cancelled) this.setState({
            image: uri,
            imgBase: base64,
        });
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
            allowsEditing: false, base64: true,
        });
        this.setState({ image: uri, imgBase: base64 });
    };
    /*
        uploadPhoto() {
    
            RNFetchBlob.fetch('POST', 'https://grudnik-projekti.eu/motorhomes/', {
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }, [
    
                    { name: 'imgpng', filename: 'img.png', type: 'image/png', data: this.state.data },
                    {
                        data: JSON.stringify({
                            name: this.state.name,
                            m_id: this.state.model_id,
                            u_id: this.user_id,
                            description: this.description,
                            price: this.price,
                            beds: this.beds,
                        })
                    },
                ]).then((response) => response.json())
                .then(async (response) => {
    
    
    
                    // If server response message same as Data Matched
                    if (response.data === "Credentials incorrect") {
    
    
                        Alert.alert("Incorecct data. Try Again!");
    
                    }
    
    
                    else {
    
                        Alert.alert("Motorhome added");
                        this.props.navigation.navigate('Home');
    
    
    
                    }
    
                }).catch((error) => {
                    console.error(error);
                });
    
        }
    */


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }


        return (


            <ScrollView style={styles.MainContainer}>
                <Text>Select model:</Text>

                <Picker
                    selectedValue={this.state.PickerValueHolder}

                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >

                    {this.state.dataSource.map((item, key) => (
                        <Picker.Item label={item.name} value={item.id} key={key} />)
                    )}
                </Picker>

                <Text>Enter description:</Text>
                <TextInput
                    multiline={true}
                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter descriptiom"

                    ref={this.descriptionInput}

                    onChangeText={(description) => this.setState({ description })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />
                <Text>Enter number of beds:</Text>
                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Insert number of beds"

                    ref={this.bedInput}

                    onChangeText={(beds) => this.setState({ beds })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}

                />
                <Text>Enter price per day:</Text>
                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Insert price"

                    ref={this.priceInput}

                    onChangeText={(price) => this.setState({ price })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}

                />
                <Text>Selected picture:</Text>
                <Image style={styles.image} source={{ uri: this.state.image }} />

                <TouchableOpacity style={styles.button} onPress={this.selectPicture}>
                    <Text style={styles.TextStyle}>Add photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.takePicture}>
                    <Text style={styles.TextStyle}>Take photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.MotorhomeAddFunction}>
                    <Text style={styles.TextStyle}>Add motorhome</Text>
                </TouchableOpacity>







            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10,
    },

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 20,
        borderRadius: 5,

    },

    TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
        marginBottom: 15
    },

    unosTexta: {
        backgroundColor: '#00BFFF',
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '2%',
    },

    posaljiDugme: {
        backgroundColor: '#00B2EE',
        textAlign: 'center',
        color: 'white',
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '2%'
    },
    button: {
        width: '100%',
        backgroundColor: 'black',
        borderRadius: 7,
        marginTop: 20,

    },

    TextStyle: {
        color: 'white',
        textAlign: 'center',
        TextStyle: 'bold',
        padding: 10
    },
    image: {
        width: '100%', height: 200,
        marginTop: 20,



    },


});
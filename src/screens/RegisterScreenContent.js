import React, { Component } from 'react';

import { StyleSheet, TextInput, View, Alert, Button, Text, AsyncStorage, } from 'react-native';

export default class RegisterScreenContent extends Component {

    constructor(props) {

        super(props)
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {

            UserName: '',
            UserEmail: '',
            UserPassword: ''

        }

    }

    UserRegistrationFunction = () => {


        const { UserName } = this.state;
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;



        fetch('https://grudnik-projekti.eu/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                name: UserName,

                email: UserEmail,

                password: UserPassword,

                password_confirmation: UserPassword,

                pic_url: "not_available.png",




            })

        }).then((response) => response.json())
            .then(async (responseJson) => {
                // If server response message same as Data Matched


                if (responseJson.data === "Credentials incorrect") {


                    Alert.alert("Incorecct data. Try Again!");

                }

                else {

                    Alert.alert("Successfully registred. Sign in");
                    this.props.navigation.navigate('MeHome');
                }

                // Showing response message coming from server after inserting records.
                //  Alert.alert(responseJson);

            }).catch((error) => {
                console.error(error);
            });

        this.nameInput.current.clear();
        this.emailInput.current.clear();
        this.passwordInput.current.clear();

    }

    render() {
        return (

            <View>

                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>User Registration Form</Text>

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Name"

                    ref={this.nameInput}

                    onChangeText={UserName => this.setState({ UserName })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Email"

                    ref={this.emailInput}

                    onChangeText={UserEmail => this.setState({ UserEmail })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Password"

                    ref={this.passwordInput}

                    onChangeText={UserPassword => this.setState({ UserPassword })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}

                    secureTextEntry={true}
                />

                <Button title="Click Here To Register" onPress={this.UserRegistrationFunction} color="black" />



            </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10
    },

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 20,

        // Set border Radius.
        borderRadius: 5
    },

});
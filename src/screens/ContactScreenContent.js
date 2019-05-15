import React from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, Linking, TouchableHighlight, TouchableOpacity } from 'react-native';
import email from 'react-native-email';

export default class App extends React.Component {

    handleEmail = () => {
        const to = ['wallicar99@gmail.com']
        email(to, {
            subject: 'Pack&GO',
            body: 'Pack&GO INFORMATION'
        }).catch(console.error)
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.paragraph}>Are you looking for more information about PACK&GO</Text>
                <View style={styles.container}>
                    <View style={styles.flexBox}>

                        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/packandgorentalservice/')}>
                            <Image
                                source={require('../../images/facebookLogo.png')}
                                style={{ width: 110, height: 110, marginLeft: 8 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Linking.openURL('https://grudnik-projekti.eu/')}>
                            <Image
                                source={require('../../images/logoPnG.png')}
                                style={{ width: 110, height: 110, marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.handleEmail}>
                        <Text style={styles.text}>Send Mail</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    flexBox: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },
    paragraph: {
        marginTop: 40,
        padding: 24,
        fontSize: 14,
        fontWeight: "300",
        textAlign: 'center',
        color: '#111',
    },
})
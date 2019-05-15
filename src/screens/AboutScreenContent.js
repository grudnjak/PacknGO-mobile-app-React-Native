import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator, navigate, StackActions, NavigationActions, NavigationEvents } from 'react-navigation';

export default class AboutScreenContent extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>ABOUT US</Text>
                        <Text style={styles.subtitle}>Do you have RV?</Text>
                        <Text style={styles.subtitle1}>Why not make some money?</Text>
                        <Image
                            source={require('../../images/money.png')}
                            style={{ width: 150, height: 150, marginBottom: 15 }}
                        />
                        <Text style={styles.subtitle}>Do you want to rent RV? </Text>
                        <Text style={styles.subtitle1}>Do it now.</Text>
                        <Image
                            source={require('../../images/camper.png')}
                            style={{ width: 150, height: 150, marginBottom: 15 }}
                        />
                        <Text style={styles.subtitle}>Do you want to try it? It's free.</Text>
                        <Text style={styles.subtitle1}>Do it!</Text>
                        <Image
                            source={require('../../images/about-us.png')}
                            style={{ width: 150, height: 150, marginBottom: 15 }}
                        />
                        <Text style={styles.subtitle}>Do you want to know more about us?</Text>
                        <Text style={styles.subtitle1}> Feel free to contact us!</Text>
                        <Text style={styles.info}> Mail: info@packngo.com</Text>
                        <Text style={styles.info}> Phone: 123 456 789</Text>
                        <Text style={styles.info}> Address: </Text>
                        <Text style={styles.info}> Šmiklavž 3a, 3342 Gornji Grad, Slovenia</Text>

                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    paragraph: {
        padding: 24,
        fontSize: 14,
        fontWeight: "300",
        textAlign: 'center',
        color: '#111',
    },
    title: {
        fontSize: 24,
        color: "#111",
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 18,
        color: "#111",
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "700",
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    subtitle1: {
        fontSize: 18,
        color: "#111",
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "400",
    },
    info: {
        fontSize: 18,
        color: "#111",
        marginBottom: 15,
        fontWeight: "400",
    }
});

import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomeScreenContent from './src/screens/HomeScreenContent';
import LoginScreenContent from './src/screens/LoginScreenContent';
import RegisterScreenContent from './src/screens/RegisterScreenContent';

import AboutScreenContent from './src/screens/AboutScreenContent';
import ContactScreenContent from './src/screens/ContactScreenContent';
import Me from './src/screens/Me';
import RentScreenContent from './src/screens/RentScreenContent';
import MotorhomeScreenContent from './src/screens/MotorhomeScreenContent';
import MyRents from './src/screens/MyRents';
import MyMotorhomes from './src/screens/MyMotorhomes';
import MotorhomeAdd from './src/screens/MotorhomeAdd';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HomeScreenContent />
      </View>
    );
  }
}




class AboutScreen extends React.Component {
  render() {
    return (
      <View>
        <AboutScreenContent />
      </View>
    );
  }
}

class ContactScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ContactScreenContent />
      </React.Fragment>
    );
  }
}

class LoginScreen extends React.Component {

  // Setting up LoginScreen title.
  static navigationOptions =
    {
      title: 'Sign in',
    };

  render() {
    return (
      <View>
        <LoginScreenContent />
      </View>
    );
  }
}

class RegisterScreen extends React.Component {
  render() {
    return (
      <View>
        <RegisterScreenContent />
      </View>
    );
  }
}

class ProfileScreen extends Component {

  // Setting up ProfileScreen title.
  static navigationOptions =
    {
      title: 'ProfileScreen',

    };


  render() {

    const { goBack } = this.props.navigation;

    return (
      <View>

        <Text style={styles.TextComponentStyle}> {this.props.navigation.state.params.Email} </Text>

        <Button title="Click here to Logout" onPress={() => goBack(null)} />

      </View>
    );
  }
}


//ME STACk
const meStack = createStackNavigator({


  //ZAČETNI SCREEN 
  MeHome: {
    screen: Me,
    navigationOptions: {
      unmountInactiveRoutes: true,
      title: 'PACK&GO'
    }
  },

  //REGISTER
  Register: {
    screen: RegisterScreenContent,
    navigationOptions: {
      title: 'Sign Up'
    },
  },

  //LOGIN 
  Login: {
    screen: LoginScreenContent,
    navigationOptions: {
      unmountInactiveRoutes: true,
      title: 'Sign In'
    },
  },

  Rent: {
    screen: RentScreenContent,
    navigationOptions: {
      title: 'Rent'
    },
  },
  Home: {
    screen: HomeScreenContent,
    navigationOptions: {
      title: 'Home'
    },
  },
  About: {
    screen: AboutScreenContent,
    navigationOptions: {

      title: 'About'
    },
  },
  Contact: {
    screen: ContactScreenContent,
    navigationOptions: {

      title: 'Contact'
    },
  },
  Motorhome: {
    screen: MotorhomeScreenContent,
    navigationOptions: {

      title: 'Motorhome'
    },
  },

  MyRents: {
    screen: MyRents,
    navigationOptions: {

      title: 'My rents'
    },
  },
  MyMotorhomes: {
    screen: MyMotorhomes,
    navigationOptions: {

      title: 'My motorhomes'
    },
  },
  MotorhomeAdd: {
    screen: MotorhomeAdd,
    navigationOptions: {

      title: 'Add new motorhome'
    },
  },

},

  {
    initialRouteName: "MeHome"
  },

);
/*
const MainApp = createBottomTabNavigator(
  {
    Home: HomeScreen,
    About: AboutScreen,
    Contact: ContactScreen,
    Login: meStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={require('./images/home.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Gallery') {
          return (
            <Image
              source={require('./images/gallery.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'About') {
          return (
            <Image
              source={require('./images/about.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Contact') {
          return (
            <Image
              source={require('./images/mail.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Login') {
          return (
            <Image
              source={require('./images/login.png')}
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }

);
*/

export default createAppContainer(meStack);

//MainApp, 
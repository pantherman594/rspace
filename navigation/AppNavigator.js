import React from 'react';
import{
	ActivityIndicator,
	AsyncStorage,
	Button,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';

import * as firebase from 'firebase';

import HostNavigator from './HostNavigator';
import RenterNavigator from './RenterNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpSelector from '../screens/SignUpSelector';
import SignUpScene from '../screens/SignUpScene';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

class AuthLoadingScreen extends React.Component {
	constructor(props) {
	  super(props);
	  this._bootstrapAsync(props);
	}

	_bootstrapAsync = (props) => {
	  const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().settings({ timestampsInSnapshots: true });
      firebase.firestore().collection('users').where('email', '==', user.email).get().then((result) => {
        result.forEach((doc) => {
          const type = doc.data().type;
          
          if (type === 'needSpace') {
            props.navigation.navigate('Renter');
          } else {
            props.navigation.navigate('Host');
          }
        });
        console.log("d");
      });
    } else {
      props.navigation.navigate('Auth');
    }
	};

	render() {
	  return(
	    <View style={styles.container}>
	      <ActivityIndicator />
	      <StatusBar barStyle="default" />
	    </View>
	  );
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
});

const AuthStack = createStackNavigator({ Login: LoginScreen, SignUpSelector: SignUpSelector, SignUp: SignUpScene });

export default createSwitchNavigator(
	{
	  AuthLoading: AuthLoadingScreen,
	  Auth: AuthStack,
    Host: HostNavigator,
    Renter: RenterNavigator,
	},
  	{
	  initialRouteName: 'AuthLoading',
	}
);

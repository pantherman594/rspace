import React from 'react';
import{
	ActivityIndicator,
	AsyncStorage,
	Button,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

class SignInScreen extends React.Component {
		static navigationOptions = { title: 'Time to Sign In',
	};

	render(){
	  return (
	    <View style={styles.container}>
	      <Button title="Sign in!" onPress={this._signInAsync} />
	    </View>
	  );
	}

	_signInAsync = async () => {
	  await AsyncStorage.setItem('userToken', 'abc');
	  this.props.navigation.navigate('App');
	};
}

class HomeScreen extends React.Component {
	static naigationOptions = {
	  title: 'Welcome to rSpace!',
	};

	render() {
	  return (
	    <View style={styles.container}>
	      <Button title="Look for Space" onPress={this._showMoreApp} />
	      <Button title="Leave" onPress={this._signOutAsync} />
	    </View>
	  );
	}

	_showMoreApp = () => {
	  this.props.navigation.navigate('Other');
	};

	_signOutAsync = async () => {
	  await AsyncStorage.clear();
	  this.props.navigation.navigate('Auth');
	};
}

class SpaceInventoryScreen extends React.Component {
	static navigationOptions = {
	  title: 'Available Spaces to Rent',
	};

	render(){
	  return (
	    <View style={styles.container}>
	      <Button title="Sign Out" onPress={this._signOutAsync} />
	      <StatusBar barStyle="default" />
	    </View>
	  );
	}

	_signOutAsync = async () => {
	  await AsyncStorage.claer(0;
	  this.props.navigation.navigate('Auth');
	};
}

class AuthLoadingScreen extends React.Component {
	constructor() {
	  super();
	  this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
	  const userToken = await AsyncStorage.getItem('userToken');
	  this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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

const styles = StyleSheet.creat({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
	{
	  AuthLoading: AuthLoadingScreen,
	  App: AppStack,
	  Auth: AuthStack,
	},
  	{
	  initialRouteName: 'AuthLoading',
	}
);

import React from 'react';
import * as firebase from 'firebase';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

const firebaseConfig = {
  apiKey: "AIzaSyBMK-8541Z0oRDzh8ITIjxSxKEj3GtDoeo",
  authDomain: "rspace-b6656.firebaseapp.com",
  projectId: "rspace-b6656",
  databaseURL: "https://rspace-b6656.firebaseio.com",
  storageBucket: "rspace-b6656.appspot.com"
};

export default class App extends React.Component {
  state = {
    isAuthVerified: false,
    isLoadingComplete: false,
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.setState({
        isAuthVerified: true,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }


  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthVerified) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.jpg'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

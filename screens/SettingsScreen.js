import React from 'react';
import {
  Button,
} from 'react-native'
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */

    return <Button onPress={this.logOut} title="Log out" />
    //return <ExpoConfigView />;
  }

  logOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('AuthLoading');
    });
  };
}

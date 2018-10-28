import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import LoginScreen from './LoginScreen';
import SignUpSelector from './SignUpSelector';
import SignUpScene from './SignUpScene';

import { MonoText } from '../components/StyledText';

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authComponent: <LoginScreen toLogin={this.toLogin} toSelector={this.toSelector} toNeedSpace={this.toNeedSpace} toHaveSpace={this.toHaveSpace} />,
    };
  }

  render() {
    return this.state.authComponent;
  }

  toLogin = () => {
    this.setState({ authComponent: <LoginScreen toLogin={this.toLogin} toSelector={this.toSelector} toNeedSpace={this.toNeedSpace} toHaveSpace={this.toHaveSpace} /> });
  };

  toSelector = () => {
    this.setState({ authComponent: <SignUpSelector toLogin={this.toLogin} toSelector={this.toSelector} toNeedSpace={this.toNeedSpace} toHaveSpace={this.toHaveSpace} /> });
  };

  toNeedSpace = () => {
    this.setState({ authComponent: <SignUpScene type='needSpace' toLogin={this.toLogin} toSelector={this.toSelector} toNeedSpace={this.toNeedSpace} toHaveSpace={this.toHaveSpace} /> });
  };

  toHaveSpace = () => {
    this.setState({ authComponent: <SignUpScene type='haveSpace' toLogin={this.toLogin} toSelector={this.toSelector} toNeedSpace={this.toNeedSpace} toHaveSpace={this.toHaveSpace} /> });
  };
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  containerMiddle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainButton: {
    margin: 10,
    marginLeft: 100,
    marginRight: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  loginBox: {
    marginLeft: 50,
    marginRight: 50,
  },
  link: {
    padding: 3,
  },
  linkText: {
    color: '#0000ff',
  },
});

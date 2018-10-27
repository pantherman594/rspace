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
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={this.state.showLogin ? styles.containerTop : styles.containerMiddle}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              require('../assets/images/robot-dev.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <View style={styles.mainButton}>
            <Button
              onPress={this.login}
              title="Login"
              disabled={this.state.showLogin}
            />
          </View>

          { this.state.showLogin
            ? <View style={styles.loginBox}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Email"
                  onChangeText={(text) => this.setState({email: text})}
                />

                <TextInput
                  style={{height: 40}}
                  placeholder="Password"
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>
            : <View style={styles.mainButton}>
                <Button
                  onPress={this.signUp}
                  title="Sign up"
                />
              </View>
          }
        </View>
      </View>
    );
  }

  login = () => {
    this.setState({showLogin: !this.state.showLogin});
  };

  signUp = () => {

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
});

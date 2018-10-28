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
import Error from '../components/Error';
import { MonoText } from '../components/StyledText';

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      email: '',
      password: '',
      errors: '',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={this.state.showLogin ? styles.containerTop : styles.containerMiddle}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              require('../assets/images/logo.jpg')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <View style={styles.mainButton}>
            <Button
              onPress={this.toggleLogin}
              title={this.state.showLogin ? "Back" : "Login"}
              color={this.state.showLogin ? "#777777" : null}
            />
          </View>

          { this.state.showLogin
            ? <View style={styles.loginBox}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Email"
                  onChangeText={(text) => this.setState({email: text})}
                  autoCapitalize='none'
                  keyboardType="email-address"
                  onSubmitEditing={() => { this.passwordInput.focus(); }}
                  blurOnSubmit={false}
                />

                <TextInput
                  style={{height: 40}}
                  placeholder="Password"
                  onChangeText={(text) => this.setState({password: text})}
                  secureTextEntry={true}
                  ref={(input) => { this.passwordInput = input; }}
                  onSubmitEditing={this.login}
                />

                <TouchableOpacity
                  onPress={this.toggleLogin}
                  style={styles.link}
                >
                  <Text style={styles.linkText}>Forgot?</Text>
                </TouchableOpacity>

                <View style={styles.mainButton}>
                  <Button
                    onPress={this.login}
                    title="Login"
                  />
                </View>
                <Error value={this.state.errors} />
              </View>
            : <View style={styles.mainButton}>
                <Button
                  onPress={this.signUp}
                  title="Sign up"
                />
              </View>
          }
        </View>
      </KeyboardAvoidingView>
    );
  }

  login = () => {
    let { errors, email, password } = this.state;
    let errored = false;

    if (email.length < 5) {
      errors = 'Invalid login!';
      errored = true;
    }

    if (password.length < 5) {
      errors = 'Invalid login!';
      errored = true;
    }
      
    if (errored) {
      this.setState({ errors });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ errors: '' });
          this.props.navigation.navigate('AuthLoading');
        })
        .catch((err) => {
          if (err && err.code) {
            if (err.code.startsWith("auth/")) errors = 'Invalid login!';
            else errors = err.message;
            this.setState({ errors });
          }
        });
    }
  };

  toggleLogin = () => {
    this.setState({showLogin: !this.state.showLogin});
  };

  signUp = () => {
    this.props.navigation.navigate('SignUpSelector');
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

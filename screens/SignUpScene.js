import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { WebBrowser } from 'expo';
import firebase from 'firebase';
require('firebase/firestore');

import Error from '../components/Error';
import { MonoText } from '../components/StyledText';

export default class SignUpNeedSpace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }

  render() {
    let type = this.props.navigation.getParam('type');
    if (!type) type = 'needSpace';
    const { errors } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>I { type === 'needSpace' ? 'need' : 'have extra' } storage space.</Text>
        <TextInput
          style={styles.registerInput}
          placeholder='First name'
          onChangeText={(text) => this.setState({ firstName: text })}
          onSubmitEditing={() => { this.lastNameInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.firstName} />

        <TextInput
          style={styles.registerInput}
          placeholder='Last name'
          onChangeText={(text) => this.setState({ lastName: text })}
          ref={(input) => { this.lastNameInput = input; }}
          onSubmitEditing={() => { this.emailInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.lastName} />

        <TextInput
          style={styles.registerInput}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({ email: text })}
          ref={(input) => { this.emailInput = input; }}
          onSubmitEditing={() => { this.confirmEmailInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.email} />

        <TextInput
          style={styles.registerInput}
          placeholder='Confirm Email'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({ confirmEmail: text })}
          ref={(input) => { this.confirmEmailInput = input; }}
          onSubmitEditing={() => { this.passwordInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.confirmEmail} />

        <TextInput
          style={styles.registerInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          ref={(input) => { this.passwordInput = input; }}
          onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.password} />

        <TextInput
          style={styles.registerInput}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          ref={(input) => { this.confirmPasswordInput = input; }}
          onSubmitEditing={this.signUp}
        />
        <Error value={errors.confirmPassword} />
        
        <TouchableOpacity
          onPress={this.signUp}
          style={styles.signUpButton}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <Error value={errors.auth} />
      </KeyboardAvoidingView>
    );
  }

  signUp = () => {
    let errors = {};
    let errored = false;

    if (this.state.firstName.length < 3) {
      errors.firstName = 'Please enter a valid name!';
      errored = true;
    }

    if (this.state.lastName.length < 3) {
      errors.lastName = 'Please enter a valid last name!';
      errored = true;
    }

    if (this.state.email.length < 5) {
      errors.email = 'Please enter a valid email!';
      errored = true;
    }

    if (this.state.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
      errored = true;
    }

    if (this.state.email !== this.state.confirmEmail) {
      errors.confirmEmail = 'Email confirmation must match email.';
      errored = true;
    }

    if (this.state.password !== this.state.confirmPassword) {
      errors.confirmPassword = 'Password confirmation must match password';
      errored = true;
    }

    if (errored) {
      this.setState({ errors });
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase.firestore().settings({ timestampsInSnapshots: true });
          firebase.firestore().collection('users').add({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            type: this.props.navigation.getParam('type'),
          }).then(() => {
            this.props.navigation.navigate('AuthLoading');
          });
        })
        .catch((err) => {
          errors.auth = err.message;
          this.setState({ errors });
        });
    }
        
  };
}

const styles = StyleSheet.create({
  scroll: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
  },
  registerInput: {
    height: 50,
    marginBottom: 10,
    fontSize: 20,
  },
  signUpButton: {
    padding: 10,
    backgroundColor: '#7777ff',
    marginLeft: 100,
    marginRight: 100,
    alignItems: 'center',
  },
});

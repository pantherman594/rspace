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

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create',
  };

  constructor(props) {
    super(props);

    this.state = {
      address: '',
      price: '',
      photos: '',
      errors: {},
    };
  }

  render() {
    const { errors } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Create a listing.</Text>
        <TextInput
          style={styles.createInput}
          placeholder='Address'
          onChangeText={(text) => this.setState({ address: text })}
          onSubmitEditing={() => { this.priceInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.address} />

        <TextInput
          style={styles.createInput}
          placeholder='Price'
          onChangeText={(text) => this.setState({ price: text })}
          keyboardType='decimal-pad'
          ref={(input) => { this.priceInput = input; }}
          onSubmitEditing={() => { this.photosInput.focus(); }}
          blurOnSubmit={false}
        />
        <Error value={errors.price} />

        <TextInput
          style={styles.createInput}
          placeholder='Photo URL'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({ photos: text })}
          ref={(input) => { this.photosInput = input; }}
          onSubmitEditing={this.create}
        />
        <Error value={errors.photos} />
        
        <TouchableOpacity
          onPress={this.create}
          style={styles.signUpButton}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
        <Error value={errors.auth} />
      </KeyboardAvoidingView>
    );
  }

  create = () => {
    let errors = {};
    let errored = false;

    if (this.state.address.length < 8) {
      errors.address = 'Please enter a valid address!';
      errored = true;
    }

    if (isNaN(this.state.price) || parseFloat(this.state.price) <= 0) {
      errors.price = 'Please enter a valid price!';
      errored = true;
    }

    if (this.state.photos.length < 5) {
      errors.photos = 'Please enter a valid photo url!';
      errored = true;
    }

    if (errored) {
      this.setState({ errors });
    } else {
      firebase.firestore().settings({ timestampsInSnapshots: true });
      firebase.firestore().collection('listings').add({
        address: this.state.address,
        price: parseFloat(this.state.price),
        photos: this.state.photos,
        ratingCount: 0,
      }).then(() => {
        this.props.navigation.navigate('Listing');
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
  createInput: {
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

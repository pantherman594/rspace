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
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class SignUpSelector extends React.Component {
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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.needSpace}
          style={[styles.button, styles.needSpace]}
        >
          <Text style={styles.buttonText}>Need Space?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.haveSpace}
          style={[styles.button, styles.haveSpace]}
        >
          <Text style={styles.buttonText}>Have Space?</Text>
        </TouchableOpacity>
      </View>
    );
  }

  needSpace = () => {
    this.props.navigation.navigate('SignUp', { type: 'needSpace' });
  };

  haveSpace = () => {
    this.props.navigation.navigate('SignUp', { type: 'haveSpace' });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    padding: 100,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
  needSpace: {
    backgroundColor: '#bc5b37',
  },
  haveSpace: {
    backgroundColor: '#bc5b37',
  },
});

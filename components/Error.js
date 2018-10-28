import React from 'react';
import {
  Text,
} from 'react-native';

export default class Error extends React.Component {
  render() {
    if (this.props.value) {
      return <Text style={{ color: 'red' }}>{this.props.value}</Text>;
    } else {
      return null;
    }
  }
}

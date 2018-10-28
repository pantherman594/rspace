import React from 'react';
import Svg, {
  G,
  Path,
} from 'react-native-svg';

export default class Star extends React.Component {
  render() {
    return (
      <Svg width="23.929" height="21.882" version="1.1" viewBox="0 0 11.623 11.081" xmlns="http://www.w3.org/2000/svg">
        <G transform="translate(-42.054 -144.07)">
          <Path d="m53.677 148.34-2.9273 2.8102 0.65546 4.0046-3.5773-1.9156-3.6061 1.8609 0.71643-3.9942-2.8841-2.8545 4.0201-0.5529 1.8236-3.6251 1.7681 3.6524z" fill={this.props.color} />
        </G>
      </Svg>
    );
  }
}

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
import Error from '../components/Error';
import Star from '../components/Star';
import axios from 'axios';
import * as firebase from 'firebase';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
//require('firebase/firestore');

export default class ListingScreen extends React.Component {
  static navigationOptions = {
    title: 'Listings',
  };

  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      email: '',
      password: '',
      errors: '',
      isLoading: true,
      latitude: 0,
      longitude: 0,
      listings: [],
      users: {},
    };
  }

  recalculateLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      if (latitude !== this.state.latitude || longitude !== this.state.longitude) {
        this.setState({ latitude, longitude });
        this.calculateDistances();
      }
    });
  }

  componentDidMount() {
    this.recalculateLocation();
    firebase.firestore().collection('listings').get().then((result) => {
      this.processListings(result, () => {
        this.setState({ isLoading: false });
      });
    });

    this.listener = firebase.firestore().collection('listings').onSnapshot((result) => {
      this.processListings(result);
    });
  }

  calculateDistances = () => {
    let { listings, latitude, longitude } = this.state;
    let distancePromises = [];
    //latitude = '33.7942272';
    //longitude = '-84.3261423';
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyAGHDuNUZZTHHd_zz2BYKPujkro5aX5Kc8&units=imperial&origins=" + latitude + "," + longitude + "&destinations=";
    console.log(url);

    listings.forEach((listing) => {
      distancePromises.push(axios.get(url + listing.address));
      console.log(url + listing.address);
    });

    Promise.all(distancePromises).then((results) => {
      for (let i = 0, len = results.length; i < len; i++) {
        let res = results[i].data;
        console.log(res.rows[0]);
        let distance = res.rows[0].elements[0].distance.text;
        console.log(distance);
        listings[i].distance = distance;
      }

      console.log(listings);
      this.setState({ listings });
    });
  }

  processListings = (listings, cb) => {
    //console.log("PROCESS");
    let listingsFormatted = [];
    let { users } = this.state;
    let userPromises = [];
    let distancePromises = [];

    //console.log(">>>");
    //console.log(listings);
    //console.log("<<<");
    listings.forEach((listing) => {
      let { address, rating, ratingCount, price, photos, host } = listing.data();
      let formattedListing = { id: listing.id, address, rating, ratingCount, price, photos, host };
      listingsFormatted.push(formattedListing);

      if (!host in users) {
        userPromises.push(firebase.firestore().collection('users').doc(host).get());
        users[listing.host] = {};
      }
    });

    Promise.all(userPromises).then((values) => {
      values.forEach((user) => {
        const data = user.data();
        const { firstName, lastName, hostRating, hostRatingCount } = data;
        users[user.id] = { name: firstName + ' ' + lastName, rating: hostRating, ratingCount: hostRatingCount };
      });

      this.setState({ listings: listingsFormatted, users });
      this.calculateDistances();
      if (cb) cb();
    });
    
  }

  componentWillUnmount() {
    this.listener(); // Unsubscribe the listener
  }

  render() {
    const { isHost } = this.props;

    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    const { listings, users } = this.state;

    let listingsRendered = [];

    for (let i = 0, len = listings.length; i < len; i++) {
      let { id, distance, rating, ratingCount, price, photos, host } = listings[i];

      listingsRendered.push(
        <View style={styles.listing} key={id} >
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={{ uri: photos }}
            />
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.price}>${price}/week</Text>
            <View style={styles.stars}>
              <Star style={styles.star} color={ rating > 0.5 ? "yellow" : "grey" }/>
              <Star style={styles.star} color={ rating > 1.5 ? "yellow" : "grey" }/>
              <Star style={styles.star} color={ rating > 2.5 ? "yellow" : "grey" }/>
              <Star style={styles.star} color={ rating > 3.5 ? "yellow" : "grey" }/>
              <Star style={styles.star} color={ rating > 4.5 ? "yellow" : "grey" }/>
            </View>
            <Text style={styles.count}>({ratingCount})</Text>
          </View>
        </View>
      );
    }

    if (isHost) {
      return (
        [
          <ScrollView key='listings' behavior="position" style={styles.container}>
            {listingsRendered}
          </ScrollView>,
          <TouchableOpacity
            key='createButton'
            onPress={this.create}
            style={styles.createButton}
          >
            <Text style={{fontSize: 20, color: 'white'}}>Create</Text>
          </TouchableOpacity>
        ]
      );
    }
    return (
      <ScrollView key='listings' behavior="position" style={styles.container}>
        {listingsRendered}
      </ScrollView>
    );
  }

  create = () => {
    this.props.navigation.navigate('Create');
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  listing: {
    flex: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 2,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    height: 200,
  },
  distance: {
    position: 'absolute',
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  price: {
    fontSize: 20,
  },
  stars: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  star: {
  },
  count: {
    fontSize: 15,
    color: 'grey',
  },
  createButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#2277bb',
  },
});

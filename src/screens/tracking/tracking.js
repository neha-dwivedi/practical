import React, { Component } from 'react';
import { Platform, Dimensions, PermissionsAndroid, StyleSheet, TouchableOpacity, Alert, Text, View, Image } from 'react-native';
import MapView, { Polygone, PROVIDER_GOOGLE, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var marker;

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:  this.props.detail.lat,
      longitude:  this.props.detail.long,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
   };
  }

componentDidMount() {
    // Initialize the module (needs to be done only once)
    Geocoder.init("AIzaSyAFBmCNOPrVgEmKK_5fWqPeEcsS3x8uWpE"); // use a valid API key
    this.requestUserCurrentPermission()
}

  //asking user current location after check permission getting user current location
  async requestUserCurrentPermission() {
    var response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (response == 'granted') {
      this.locateUserCurrentPositin()
    }
    else {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Practical',
          message:
            'Practical App needs access your device permission, please provide',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
  }

  //user current location
  async locateUserCurrentPositin() {
    await Geolocation.getCurrentPosition(
      (position) => {
        let userInitialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }
        this.setState({ userInitialRegion })
      },
      (error) => {
        // See error code charts below.
        Alert.alert(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <MapView
        style={styles.map}
        showUserLocation
        provider={PROVIDER_GOOGLE}
        followUserLocation
        loadingEnabled
        region={this.state.userInitialRegion}
      >
        <MapView.Polyline
          coordinates={[
            { latitude: 23.033863, longitude: 72.585022 },
            { latitude: 3.140853
              , longitude: 72.831062 },
          ]}
          strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={5} />

        <MapView.Marker
          coordinate={
            { latitude: 23.033863, longitude: 72.585022 }
          }
        >
          <View>
            <Image style={{ width: 40, height: 40, borderRadius: 30 }} source={{ uri: 'img' }}></Image>
          </View>
        </MapView.Marker>

        <MapView.Marker
          coordinate={
            { latitude: 3.140853
              , longitude: 72.831062 }
          }
          title='location'
        >
          <MapView.Callout>
            <Text>You are here</Text>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Tracking;

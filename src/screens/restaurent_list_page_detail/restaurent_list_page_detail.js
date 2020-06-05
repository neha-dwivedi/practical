//import react components here..
import React, { Component } from 'react'
import {
  Text, Image,
  View,
  SafeAreaView,
} from 'react-native'
import styles from "./styles"
import { SliderBox } from "react-native-image-slider-box";

export default class Restaurent_list_page_detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants_details: this.props.detail,
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
        // require('./assets/images/girl.jpg'),          // Local image
      ]
    }
  }

  //Design:- render design here..
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SliderBox images={this.state.images} />
        <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 10 }}>{this.state.restaurants_details.title}</Text>
        <Text style={{ margin: 10 }}>+91{this.state.restaurants_details.phone_no}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20, left: 10 }}>
          {/* <TouchableOpacity onPress={()=>{this.changeStar}}> */}
          <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
          <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
          <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
          <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
          <Image source={{ uri: "empty_star" }} style={styles.star_style}></Image>
          {/* </TouchableOpacity> */}
          <Text style={{ color: 'green', top: 12, left: 10 }}>(1000 reviews)</Text>
        </View>
        <View style={{ left: 10 }}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
          <Text>{this.state.restaurants_details.description}</Text></View>

        <View style={{ left: 10 }}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Address</Text>
          <Text>{this.state.restaurants_details.address}</Text>
          <Text>{this.state.restaurants_details.city}</Text>
          <Text>{this.state.restaurants_details.country}</Text></View>

      </SafeAreaView>
    );
  }
}
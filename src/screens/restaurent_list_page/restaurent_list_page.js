//import react components here..
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Alert
} from 'react-native'
import styles from "./styles"

//import external libraries here..
import { Actions } from 'react-native-router-flux'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const baseURL = "http://192.249.121.94/~mobile/interview/public/api/restaurants_list" // DEV

const { width, height } = Dimensions.get("window");

export default class Restaurent_list_page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProgress: false,
      restaurants_list_data: [],
    }
  }

  //lifecycle method of react native
  componentDidMount() {
    fetch(baseURL, {
      method: 'GET'
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        this.setState({ restaurants_list_data: responseJson.data })
      })
  }

  //here we initialize the db and create the new table and insert the data on this
  initDB() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
          else {
            console.log('else')
            fetch(baseURL, {
              method: 'GET'
              //Request Type 
            })
              .then((response) => response.json())
              //If response is in json then in success
              .then((responseJson) => {
                db.transaction(function (tx) {
                  responseJson.data.map((data) => {
                    tx.executeSql(
                      'INSERT INTO table_user (user_id, user_name, user_contact, user_address) VALUES (?,?,?)',
                      [data.id, data.title, data.phone_no],
                      (tx, results) => {
                        console.log('Results', results.rowsAffected);
                      });
                  })
                })
                this.fetchProduct()
              })
          }
        }
      );
    });
  };

  //fetching the product detail from local machine
  fetchProduct() {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM table_user',
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            restaurants_list_data: temp,
          });
        });
    })
  }

  //redirect to restaurent detail page
  redirectToDetailScreen(item) {
    this.setState({ showProgress: false })
    Actions.restaurent_list_page_detail({ detail: item })
  }

  //redirect to map page
  redirectToMapScreen(item) {
    this.setState({ showProgress: false })
    Actions.tracking({ detail: item })
  }

  //Design:- render design here..
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header_view}>
          <Text style={styles.back_btn}>Back</Text>
          <Text style={styles.header_text}>Restaurent List
      </Text>
          <View style={styles.space}></View>
        </View>
        <FlatList
          style={{ flexGrow: 1, flex: 0.5 }}
          data={this.state.restaurants_list_data}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <TouchableOpacity style={{ flex: 0.7 }} onPress={() => this.redirectToDetailScreen(item)}>

                  <View style={styles.img_view}>
                    <Image source={{ uri: "img" }} style={{ height: 50, width: 80 }}></Image>
                  </View>
                  <View style={styles.middle_view}>
                    <Text bold>
                      {item.title}
                    </Text>
                    {/* {this.startView()} */}
                    <View style={{ flexDirection: 'row' }}>
                      {/* <TouchableOpacity onPress={()=>{this.changeStar}}> */}
                      <Image source={{ uri: "empty_star" }} style={styles.star_style}></Image>
                      <Image source={{ uri: "empty_star" }} style={styles.star_style}></Image>
                      <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
                      <Image source={{ uri: "fill_start" }} style={styles.star_style}></Image>
                      <Image source={{ uri: "empty_star" }} style={styles.star_style}></Image>
                      {/* </TouchableOpacity> */}
                    </View>

                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.redirectToMapScreen(item)} style={styles.map_view}>
                  <Image source={{ uri: "map" }} style={{ height: 20, width: 20, left: 10 }}></Image>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {this.state.showProgress ? <View style={{
          height: height, width: width, position: 'absolute', justifyContent:
            'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(223, 99, 54, 0.5)'
        }}>
          <ActivityIndicator size='large' color='white' style={{ paddingTop: 30 }}></ActivityIndicator>
        </View> : null}
      </SafeAreaView>
    );
  }
}
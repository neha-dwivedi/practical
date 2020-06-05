import React, { Component } from 'react'
import { Scene, Actions, Router, Stack, Tabs } from 'react-native-router-flux'
import restaurent_list_page from './../screens/restaurent_list_page/restaurent_list_page'
import restaurent_list_page_detail from './../screens/restaurent_list_page_detail/restaurent_list_page_detail'
import tracking from './../screens/tracking/tracking'

// import messageList from '../screens/postlogin/messageList/messageList'
import styles from "./styles"

export default class App extends Component {

 render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
        sceneStyle={styles.routerScene}
      >
        <Scene key="root" >
          <Stack key="restaurent_list_page" hideNavBar>
            <Scene key="restaurent_list_page" component={restaurent_list_page} />
          </Stack>
          <Stack key="restaurent_list_page_detail" hideNavBar>
            <Scene key="restaurent_list_page_detail" component={restaurent_list_page_detail} />
          </Stack>
          <Stack key="tracking" hideNavBar>
            <Scene key="tracking" component={tracking} />
          </Stack>
        </Scene>
      </Router>
    )
  }
}
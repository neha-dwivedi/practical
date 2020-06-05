import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#FFFFFF", // changing navbar color
        borderWidth: 0,
       // borderBottomColor: "#082935",
        borderBottomWidth:0,
        elevation:0
      },
      navTitle: {
        color: "#424853", 
        fontSize:14,
        fontWeight:"bold"
      },
      routerScene: {},
      textStyle: {
        //fontSize: 28
      },
      tabIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
      },
      tabSelectedLabel: {
        fontSize: 18,
        // fontFamily: 'OpenSans-SemiBold'
      }
});
export default styles;

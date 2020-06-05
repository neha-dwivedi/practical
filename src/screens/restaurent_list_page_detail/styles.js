import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
       flex:1,
        backgroundColor:"#DCDCDC",
      },
    header_view: {
      flex:0.08,justifyContent:'center',backgroundColor:'#228B22'
    },
    // scrl: {
    //   height: Dimensions.get('window').height,
    //   width: Dimensions.get('window').width
    // },
    back_btn: {
      top:25,left:20,color: 'white',fontSize:16,
    },
    header_text: {
      fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center',
      borderBottomColor: 'rgba(234,66,26,1)'
    },
    space:{
      height: 25, width: 25
    },
    card:{
      flexDirection:'row',backgroundColor:'white',borderWidth:0,height:80,borderRadius:5, margin:10
    },
    middle_view : {
      flexDirection:'column',left:30,top:18,flex:0.5,
    },
    img_view : {
      justifyContent:'center',left:10
    },
    star_style : {
      height:20,width:20,top:10
    },
    map_view : {
      backgroundColor:'green',borderWidth:0,top:15,left:80,height:50,width:40,justifyContent:'center',borderRadius:5
    }

});
export default styles;

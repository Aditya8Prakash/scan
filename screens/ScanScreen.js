import React from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        CameraPermission: null,
        scanned: false,
        dataScanned: '',
        buttonState: 'ok'
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        CameraPermission: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCode = async({data})=>{
      this.setState({
        scanned: true,
        dataScanned: data,
        buttonState: 'ok'
      });
    }

    render() {
      const CameraPermission = this.state.CameraPermission;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && CameraPermission){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCode}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "ok"){
        return(
          <View style={styles.container}>
             <View>
              <Image
                source={require("../assets/camera.png")}
                style={{width:270, height: 270,alignSelf:'center'}}/>
              <Text style={{textAlign: 'center', fontSize: 35,marginTop:10 }}>Bar Code Scanner</Text>
            </View>
          <Text style={styles.displayText}>{
            CameraPermission===true ? this.state.dataScanned: "Camera Permission Needed"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style= {styles.scanButton} 
            title = "Bar Code Scanner">
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 19,
      padding:5,
      borderWidth:1,
      borderRadius:5,
      borderColor:'balck',
      marginTop:30
    },
    scanButton:{
      backgroundColor: '#8cff9f',
      padding: 15,
      marginTop: 30,
      borderRadius:5
    },
    buttonText:{
      fontSize: 22,
    }
  });
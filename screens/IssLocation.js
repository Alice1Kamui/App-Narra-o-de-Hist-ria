import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps'
import axios from 'axios'
import { Alert,Text, View, StyleSheet, ImageBackground, StatusBar,SafeAreaView, Platform } from 'react-native';


export default class IssLocationScreen extends Component {
    constructor(props){

        super(props);
        this.state={
            location:{}
        }
    }

    componentDidMount(){
        this.getIssLocation()
        try{
            setInterval(async ()=>{
                this.getIssLocation()

            },2000)
        }catch(e){
            console.log(e)
        }

    }

    getIssLocation =()=>{

        axios
            .get('https://api.wheretheiss.at/v1/satellites/25544')
            .then(response=>{

                this.setState({location: response.data})
              }).catch(error=>{

                Alert.alert(error.message)
              })

    }
   render() {

    if(Object.keys(this.state.location).length === 0){
        return(
            <View   
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}        
                >
                <Text>Carregando</Text>
            </View>

        )
    } else {return (
        <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <ImageBackground  source={require('../assets/bg.png')} style={styles.backgroundImage}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Tela Localização EEI</Text>
                </View>
                <View>
                     <MapView
                         style={styles.maps}
                         region={{
                             latitude: this.state.location.latitude,
                             longitude: this.state.location.longitude,
                             latitudeDelta:100,
                             longitudeDelta:100
                         }}
                     >
                         <Marker
                             coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}

                         >
                             <Image source={require('../assets/iss_icon.png')} style={{height: 50, width: 50}}>
                             </Image>
                         </Marker>
                     </MapView>
                </View>
                <View style={styles.infoContainer}>
                         <Text  style={styles.infoText}>Latitude:{this.state.location.latitude}</Text>
                         <Text  style={styles.infoText}>Longitude:{this.state.location.longitude}</Text>
                         <Text  style={styles.infoText}>Altitude(KM):{this.state.location.altitude}</Text>
                         <Text  style={styles.infoText}>Velocidade(KM/H):{this.state.location.velocity}</Text>
                </View>
            </ImageBackground>
        </View>
       
    )}
       
   }
}


const styles = StyleSheet.create({
   container: {
       flex: 1,
   },
   droidSafeArea: {
       marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
   },
   backgroundImage: {
       flex: 1,
       resizeMode: 'cover',
   },
   titleContainer: {
       flex: 0.1,
       justifyContent: 'center',
       alignItems: 'center',
   },
   titleText: {
       fontSize: 30,
       fontWeight: 'bold',
       color: 'white'
   }
})


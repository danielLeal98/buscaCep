import React, { Component } from 'react';
import {StyleSheet,View,Text,AsyncStorage} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class Maps extends Component {

    constructor(props){
      super(props);
      this.state ={
       longitude: '',
       latitude: ''
      };                        
    }

     async getCoord (lat, lon) {      
      try {
        const lat = await AsyncStorage.getItem('latitude') || 'none';
        const lon = await AsyncStorage.getItem('longitude') || 'none';                       
        this.setState({longitude: lon, latitude: lat});
      } catch (error) {        
        console.log('Error ao pegar os dados' + error);
      }
    }

    render(){   
      this.getCoord();
        return (
          <View style={styles.body}>                           
          <MapView
            style={styles.map} zoomEnabled={true} showsUserLocation={true}
            initialRegion={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}>
            <Marker
              coordinate={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude)
              }}
              title="Local da sua busca"
              description="Seu local solicitado"
            />
          </MapView>
        </View>                                         
        );
    }
}

const styles = StyleSheet.create({
    body:{      
      flex: 1,      
      paddingTop:5      
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
     }
});
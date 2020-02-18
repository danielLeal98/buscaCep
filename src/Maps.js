import React, { Component } from 'react';
import {StyleSheet,View,Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class Maps extends Component {

  static navigationOptions = {
    title: 'Maps',
    header: null,
    headerTitleStyle: {  
      fontWeight: 'bold',  
    }, 
  }
    constructor(props){
      super(props);
      this.state ={
       longitude: '',
       latitude: ''
      };                        
    }

    render(){     
        return (            
          <View style={styles.body}>                      
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -22.76,
              longitude: -43.4,
              latitudeDelta: 0,
              longitudeDelta: 0.05,
            }}>
            <Marker
              coordinate={{
                latitude: -22.76,
                longitude: -43.4
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
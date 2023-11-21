import React, { useState }  from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';


export default function Shelters({shelters, onTapPoint, visible}) {
  if(!visible) { return(null) }

  // flagrant duplication
  const scrubbedCoordinates = (coordinates) => {
    if(typeof coordinates.latitude === "string" || typeof coordinates.longitude === "string") {
      return( {latitude: parseFloat(coordinates.latitude), longitude: parseFloat(coordinates.longitude)} )
    } else {
      return(coordinates);
    }
  }

  const shelterMarkers = () => {
    let markers = shelters.map((shelter) => {
      return(
        <Marker key={shelter.id} coordinate={scrubbedCoordinates(shelter.coordinate)} onPress={() => {onTapPoint(shelter)}}>
          <View style={styles.iconWrapper}>
            <Ionicons name="md-home" size={12} color="white" />
          </View>
        </Marker>
      )
    })

    return(markers);
  }

  return(shelterMarkers());
}

const styles = StyleSheet.create({
  iconWrapper: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

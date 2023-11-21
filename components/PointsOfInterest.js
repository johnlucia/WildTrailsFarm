import React, { useState }  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DoubleDiamond from '../components/DoubleDiamond';
import { Marker } from 'react-native-maps';

export default function PointsOfInterest({pointsOfInterest, onTapPoint, visible}) {
  if(!visible) { return(null) }

  // flagrant duplication
  const scrubbedCoordinates = (coordinates) => {
    if(typeof coordinates.latitude === "string" || typeof coordinates.longitude === "string") {
      return( {latitude: parseFloat(coordinates.latitude), longitude: parseFloat(coordinates.longitude)} )
    } else {
      return(coordinates);
    }
  }

  const poiIcon = (icon) => {
    return icon || "md-pin"
  }

  const iconColor = (color) => {
    return color || "black"
  }

  const iconSize = (size) => {
    return size || 25
  }

  const iconSource = (poi) => {
    if (poi.icon_source == "Ionicons") {
      return(
        <Ionicons name={poiIcon(poi.icon)} size={iconSize(poi.size)} color={iconColor(poi.color)} />
      );
    }else if (poi.icon_source == "MaterialCommunityIcons") {
      return(
        <MaterialCommunityIcons name={poiIcon(poi.icon)} size={iconSize(poi.size)} color={iconColor(poi.color)} />
      );
    }else if (poi.icon_source == "DoubleDiamond") {
      return(
        <DoubleDiamond name={poiIcon(poi.icon)} size={iconSize(poi.size)} color={iconColor(poi.color)} />
      );
    }else {
      return(
        <Ionicons name={poiIcon(poi.icon)} size={iconSize(poi.size)} color={iconColor(poi.color)} />
      );
    }
  }

  const pointOfInterestMarkers = () => {
    let markers = pointsOfInterest.map((poi) => {
      return(
        <Marker key={poi.id} coordinate={scrubbedCoordinates(poi.coordinate)} onPress={() => {onTapPoint(poi)}}>
          <View style={styles.iconWrapper}>
            { iconSource(poi) }
          </View>
        </Marker>
      )
    })

    return(markers);
  }

  return(pointOfInterestMarkers());
}

const styles = StyleSheet.create({
  iconWrapper: {},
  pText: {
    fontSize: 12,
    color: '#ffffff'
  }
});

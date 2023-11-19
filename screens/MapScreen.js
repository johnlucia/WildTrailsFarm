import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Trails from '../components/Trails';
import Boundaries from '../components/Boundaries';
import {boundaries} from '../geodata/boundaries';




export default function MapScreen() {

  // liveTrailData is an array of trail objects
  const [skiTrails, setSkiTrails] = useState(null);
  const [activeTrailID, setActiveTrailID] = useState(0);
  const [activeTrail, setActiveTrail] = useState(null);
  const [trailInfoVisible, setTrailInfoVisible] = useState(false);

  const onTapTrail = (trail) => {
    setActiveTrailID(trail.uid);
    setActiveTrail(trail);
    setTrailInfoVisible(true);
  }

  const skiTrailData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      const trailArray = JSON.parse(jsonValue).trails;
      setSkiTrails(trailArray);
      return trailArray;
    } catch (e) {
      // error fetching data
    }
  };

  useEffect(() => {
    skiTrailData();
  }, []);

  return (
    <View>
      <MapView 
        style={styles.mapStyle}
        initialRegion={{
          latitude: 43.262,
          longitude: -72.523,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        showsScale={true}
      >
        {/* MAP FEATURES GO HERE */}
        <Trails trails={skiTrails} onTapTrail={onTapTrail} activeTrailID={activeTrailID} visible={true} />
        <Boundaries boundaries={boundaries} onTapBoundary={onTapTrail} activeTrailID={activeTrailID} visible={true} />



      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

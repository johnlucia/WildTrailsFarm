import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Trails from '../components/Trails';
import Boundaries from '../components/Boundaries';
import {boundaries} from '../geodata/boundaries';
import Shelters from '../components/Shelters';
import TrailInfo from '../components/TrailInfo';
import PointInfo from '../components/PointInfo';
import PointsOfInterest from '../components/PointsOfInterest';





export default function MapScreen() {

  const [skiTrails, setSkiTrails] = useState([]);
  const [activeTrailID, setActiveTrailID] = useState(0);
  const [activeTrail, setActiveTrail] = useState(null);
  const [trailInfoVisible, setTrailInfoVisible] = useState(false);
  const [infoPanelNeedsReset, setInfoPanelNeedsReset] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [pointInfoVisible, setPointInfoVisible] = useState(false);
  const [shelterList, setShelterList] = useState([]);
  const [poiList, setPoiList] = useState([]);

  // TRAILS ************************************
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

  // INFO PANEL ************************************
  useEffect(() => {
    if(infoPanelNeedsReset) {
      setActivePoint(null);
      setActiveTrailID(0);
      setActiveTrail(null);

      setTrailInfoVisible(false);
      setPointInfoVisible(false);

      setInfoPanelNeedsReset(false);
    }
  });

  const resetInfoPanel = () => {
    setInfoPanelNeedsReset(true);
  }

  // POINTS ************************************
  const onTapPoint = (point) => {
    setPointInfoVisible(true);
    setActivePoint(point);
  }

  // SHELTERS ************************************
  const shelterData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      const shelterArray = JSON.parse(jsonValue).shelters;
      setShelterList(shelterArray);
      return shelterArray;
    } catch (e) {
      // error fetching data
    }
  };

  useEffect(() => {
    shelterData();
  }, []);

  // POI ************************************
  const pointsOfInterestData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      const pois = JSON.parse(jsonValue).points_of_interest;
      setPoiList(pois);
      return pois;
    } catch (e) {
      // error fetching data
    }
  };

  useEffect(() => {
    pointsOfInterestData();
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
        <Shelters shelters={shelterList} onTapPoint={onTapPoint} visible={true} />
        <PointsOfInterest pointsOfInterest={poiList} onTapPoint={onTapPoint} visible={true} />




      </MapView>
      <View></View>
      <TrailInfo trail={activeTrail} visible={trailInfoVisible} onCloseTrailInfo={resetInfoPanel} />
      <PointInfo point={activePoint} visible={pointInfoVisible} onClosePointInfo={resetInfoPanel} />
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

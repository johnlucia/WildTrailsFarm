import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Trails from '../components/Trails';
import Boundaries from '../components/Boundaries';
import {boundaries} from '../geodata/boundaries';
import Shelters from '../components/Shelters';
import TrailInfo from '../components/TrailInfo';
import PointInfo from '../components/PointInfo';
import PointsOfInterest from '../components/PointsOfInterest';

export default function MapScreen() {

  const [skiTrails, setSkiTrails] = useState([]);
  const [ungroomedTrails, setUngroomedTrails] = useState([]);
  const [snowshoeTrails, setSnowshoeTrails] = useState([]);
  const [activeTrailID, setActiveTrailID] = useState(0);
  const [activeTrail, setActiveTrail] = useState(null);
  const [trailInfoVisible, setTrailInfoVisible] = useState(false);
  const [infoPanelNeedsReset, setInfoPanelNeedsReset] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [pointInfoVisible, setPointInfoVisible] = useState(false);
  const [shelterList, setShelterList] = useState([]);
  const [poiList, setPoiList] = useState([]);

  const [showUngroomed, setShowUngroomed] = useState(true);
  const [showPointsOfInterest, setShowPointsOfInterest] = useState(true);
  const [showShelters, setShowShelters] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      // When the screen comes into focus...
      const settingsData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user-settings');
          const settingsJson = JSON.parse(jsonValue);
          setShowUngroomed(settingsJson.showUngroomed);
          setShowPointsOfInterest(settingsJson.showPointsOfInterest);
          setShowShelters(settingsJson.showShelters);
          return trailArray;
        } catch (e) {
          // Error fetching user settings
        }
      };
      settingsData();
      return () => {
      };
    }, [])
  );

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

  const otherTrailData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      const ungroomedTrailArray = JSON.parse(jsonValue).ungroomed;
      const snowshoeTrailArray = JSON.parse(jsonValue).snowshoe;
      setUngroomedTrails(ungroomedTrailArray);
      setSnowshoeTrails(snowshoeTrailArray);
      return trailArray;
    } catch (e) {
      // error fetching data
    }
  };

  useEffect(() => {
    otherTrailData();
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
        <Trails trails={ungroomedTrails} onTapTrail={onTapTrail} activeTrailID={activeTrailID} visible={showUngroomed} dashPattern={[5,8]} />
        <Trails trails={snowshoeTrails} onTapTrail={onTapTrail} activeTrailID={activeTrailID} visible={true} dashPattern={[5,8]} />
        <Boundaries boundaries={boundaries} onTapBoundary={onTapTrail} activeTrailID={activeTrailID} visible={true} />
        <Shelters shelters={shelterList} onTapPoint={onTapPoint} visible={showShelters} />
        <PointsOfInterest pointsOfInterest={poiList} onTapPoint={onTapPoint} visible={showPointsOfInterest} />
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

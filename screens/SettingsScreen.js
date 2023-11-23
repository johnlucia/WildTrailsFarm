import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SettingsScreen() {
  const [showUngroomed, setShowUngroomed] = useState(true);
  const [showPointsOfInterest, setShowPointsOfInterest] = useState(true);
  const [showShelters, setShowShelters] = useState(true);

  const updateViewSettings = async () => {
    try {
      const userSettings = {showUngroomed: showUngroomed, showPointsOfInterest: showPointsOfInterest, showShelters: showShelters};
      await AsyncStorage.setItem('user-settings', JSON.stringify(userSettings));
    } catch (e) {
      // user setting error
    }
  };

  useEffect(() => {
    updateViewSettings();
  }, [showUngroomed, showPointsOfInterest, showShelters]);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.titleText}>Map Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.toggleWrapper}>
          <View style={styles.labelWrap}><Text>Show Ungroomed Trails</Text></View>
          <Switch
            value={showUngroomed}
            onValueChange={setShowUngroomed}
            trackColor={{false: 'red', true: 'green'}}/>
        </View>
        <View style={styles.toggleWrapper}>
          <View style={styles.labelWrap}><Text>Show Points of Interest</Text></View>
          <Switch
            value={showPointsOfInterest}
            onValueChange={setShowPointsOfInterest}
            trackColor={{false: 'red', true: 'green'}}/>
        </View>
        <View style={styles.toggleWrapper}>
          <View style={styles.labelWrap}><Text>Show Shelters</Text></View>
          <Switch
            value={showShelters}
            onValueChange={setShowShelters}
            trackColor={{false: 'red', true: 'green'}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    padding: 10
  },
  titleText: {
    fontSize:25,
    fontWeight: 'bold'
  },
  content: {
    width: '80%',
    alignItems: 'center'
  },
  toggleWrapper: {
    padding: 10,
    paddingBottom: 20,
    margin: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  labelWrap: {
    marginBottom: 10
  }
});

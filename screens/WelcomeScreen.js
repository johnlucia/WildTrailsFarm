import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SponsorRow from '../components/SponsorRow';
import WelcomeContent from '../components/WelcomeContent';

export default function WelcomeScreen() {
  const [liveTrailData, setLiveTrailData] = useState(null);
  const trailData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      setLiveTrailData(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error fetching data
    }
  };

  useEffect(() => {
    trailData();
  }, []);

  return (liveTrailData !== null ? (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.titleText}>Wild Trails Farm</Text>
      </View>
      <View style={styles.contentWrap}>
        {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} > */}
        <ScrollView>
          <SponsorRow sponsors={liveTrailData.sponsors.slice(0, 2)} />
          <SponsorRow sponsors={liveTrailData.sponsors.slice(2, 4)} />
          <WelcomeContent content={liveTrailData.welcome_content} />
        </ScrollView>
      </View>
    </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.titleText}>Loading</Text>
      </View>
    ));
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10
  },
  titleWrap: {
    padding: 10
  },
  titleText: {
    fontSize:25,
    fontWeight: 'bold'
  },
  h2Wrap: {
    alignItems: 'center',
    paddingVertical: 5
  },
  h2: {
    fontSize: 18
  },
  contentWrap: {
    width: '80%',
    flex: 1,
    marginTop: 5
  }
});

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SponsorRow from '../components/SponsorRow';
import WelcomeContent from '../components/WelcomeContent';

export default function WelcomeScreen() {
  const [liveTrailData, setLiveTrailData] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [welcomeContent, setWelcomeContent] = useState([]);
  const trailData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('live-trail-data');
      setLiveTrailData(JSON.parse(jsonValue));
      setSponsors(JSON.parse(jsonValue).sponsors);
      setWelcomeContent(JSON.parse(jsonValue).welcome_content);
      return(JSON.parse(jsonValue));
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
          <SponsorRow sponsors={sponsors.slice(0, 2)} />
          <SponsorRow sponsors={sponsors.slice(2, 4)} />
          <WelcomeContent content={welcomeContent} />
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

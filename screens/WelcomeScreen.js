import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
  const [liveTrailData, setLiveTrailData] = useState(null);
  const trailData = async () => {
    try {
      console.log("********** Fetching Trail Data ***************")
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
        <Text>{liveTrailData.sponsors[0].logo_url}</Text>
        <Text>{liveTrailData.sponsors[0].link_url}</Text>
        <Text>{liveTrailData.welcome_content[0].body}</Text>
        <Text>{liveTrailData.welcome_content[1].body}</Text>
        <Text>{liveTrailData.welcome_content[2].body}</Text>
        <Text>{liveTrailData.welcome_content[3].body}</Text>
        {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <SponsorRow sponsors={useSelector(state => state.dynamicContent.sponsors).slice(0, 2)} />
          <SponsorRow sponsors={useSelector(state => state.dynamicContent.sponsors).slice(2, 4)} />
          <WelcomeContent content={useSelector(state => state.dynamicContent.welcome_content)} />
        </ScrollView> */}
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

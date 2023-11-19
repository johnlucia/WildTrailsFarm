import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

import MapScreen from './screens/MapScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const homeIcon     = () => <Ionicons name="md-trail-sign" size={32} color="black" />
const mapIcon      = () => <Ionicons name="md-map"        size={32} color="black" />
const settingsIcon = () => <Ionicons name="md-settings"   size={32} color="black" />

export default function App() {
  const [liveTrailData, setLiveTrailData] = useState(null);

  const defaultTrailData = {
    'loaded': false,
    'sponsors': [
      {
        "id": 1,
        "name": "",
        "logo_url": "https://res.cloudinary.com/rhythm/image/upload/v1611339316/WildTrailsFarm/splash.png",
        "link_url": "http://wildtrailsfarm.com",
        "description": ""
      }
    ],
    'welcome_content': [
      {
        "id": 1,
        "position": 1,
        "heading": "Welcome!",
        "body": "You are currently offline. For the most up to date trail information, please start up the app within cell range or while connected to WiFi.",
        "link_text": "",
        "link_url": ""
      },
      {
        "id": 1,
        "position": 1,
        "heading": "Introduction",
        "body": "Wild Trails Farm (174 Ruusunen Road, Springfield VT) offers approximately 20 km of private hiking trails on 472 acres of mostly forested, hilly land, with about 40 acres of open fields.  Most of the trails are groomed for cross country skiing in winter.  The trails are generally intermediate, with more challenging portions marked by a black diamond. Trails that are ungroomed, and generally more rugged, are marked with a dotted line.   ",
        "link_text": "",
        "link_url": ""
      },
      {
        "id": 3,
        "position": 2,
        "heading": "",
        "body": "One trail is public and can be accessed by looking for signs on the right side of Ruusunen Road near the entrance to the property.  Numerous trails and old roads off the property can be accessed from both the private and public trails.",
        "link_text": "",
        "link_url": ""
      },
      {
        "id": 4,
        "position": 3,
        "heading": "",
        "body": "All inquiries, including requests to hike or ski the private trails, can be directed to wildtrails@wildtrailsfarm.com.  Wild Trails Farm is in the process of launching a retreat and outdoor center that will offer lodging, trail access and retreats and other events. ",
        "link_text": "",
        "link_url": ""
      },
      {
        "id": 2,
        "position": 10,
        "heading": "Center",
        "body": "The center includes a 6-bedroom inn as well as numerous old and new outbuildings that will be converted to lodging and other uses.  The most prominent of these buildings is a large barn that was built in 1801 using an ancient construction method is rarely found in New England.  Other features include orchards, organic gardens, two ponds, and bocce and volleyball courts. ",
        "link_text": "",
        "link_url": ""
      }
    ],
    'trails': [],
    'ungroomed': [],
    'snowshoe': [],
    'junctions': [],
    'parking': [],
    'shelters': [],
    'points_of_interest': []
  };

  const storeData = async (value) => {
    try {
      console.log("********** Setting Trail Data ***************")
      console.log(value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('live-trail-data', jsonValue);
    } catch (e) {
      console.log("************************ error storing data ******************************")
    }
  };

  const fetchLiveTrailData = async () => {
    try {
      const response = await fetch('https://wild-trails-farm.herokuapp.com/api/v1/welcome_data.json');
      const json = await response.json();
      setLiveTrailData(json);
      storeData(json);
    } catch (error) {
      console.log('*********** API call error **********');
      storeData(defaultTrailData);
    } finally {
      console.log('*********** done with dynamic content load **********');
    }
  }

  useEffect(() => {
    fetchLiveTrailData();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Welcome"  component={WelcomeScreen}  options={{tabBarIcon: homeIcon    }} />
        <Tab.Screen name="Map"      component={MapScreen}      options={{tabBarIcon: mapIcon     }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: settingsIcon}} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from './screens/MapScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const homeIcon     = () => <Ionicons name="md-trail-sign" size={32} color="black" />
const mapIcon      = () => <Ionicons name="md-map"        size={32} color="black" />
const settingsIcon = () => <Ionicons name="md-settings"   size={32} color="black" />

export default function App() {
  return (
    <NavigationContainer>
      <Text>What the fuck? over.</Text>
      <Tab.Navigator>
        <Tab.Screen name="Welcome"  component={WelcomeScreen}  options={{tabBarIcon: homeIcon    }} />
        <Tab.Screen name="Map"      component={MapScreen}      options={{tabBarIcon: mapIcon     }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: settingsIcon}} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

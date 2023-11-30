import React, { useState }  from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

export default function SecondarySponsor({sponsor}) {
  if(!sponsor) {
    return(null);
  }

  return(
    <View style={styles.sponsor2}>
      <TouchableOpacity style={styles.sponsorContent} onPress={() => Linking.openURL(sponsor.link_url)} >
        <View style={styles.sponsorNameWrapper}>
          <Text style={styles.sponsorName} >{sponsor.name}</Text>
        </View>
        <Image source={{uri: sponsor.logo_url}} style={{width: 180, height: 180}} />
        <Text>{sponsor.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sponsor2: {
    width: '47%',
    height: 180,
    marginVertical: 5,
    marginHorizontal: 5,
    // backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sponsorContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorNameWrapper: {
    padding: 10
  },
  sponsorName: {
    fontSize: 16,
    textAlign: 'center'
  }
});

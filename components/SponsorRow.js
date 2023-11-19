import React, { useState }  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SecondarySponsor from './SecondarySponsor'

export default function SponsorRow({sponsors}) {
  if(sponsors.length === 0) {
    return(null);
  }
  return(
    <View style={styles.sponsors}>
      <SecondarySponsor sponsor={sponsors[0]}/>
      <SecondarySponsor sponsor={sponsors[1]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  sponsors: {
    flexDirection: 'row',
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

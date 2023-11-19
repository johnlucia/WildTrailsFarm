import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

export default function WelcomeContent({content}) {
  const headerMarkup = (item) => {
    if(!item.heading) { return(null); }
    return(
      <View style={styles.h2Wrap}>
        <Text style={styles.h2}>{item.heading}</Text>
      </View>
    ); 
  }

  const bodyMarkup = (item) => {
    if(!item.body) { return(null); }
    return(
      <Text style={styles.textWrap}>{item.body}</Text>
    );
  }

  const linkMarkup = (item) => {
    if(!item.link_url || !item.link_text) { return(null); }

    return(
      <TouchableOpacity onPress={() => Linking.openURL(item.link_url)} >
        <View style={styles.linkWrap}>
          <Text style={styles.linkText} >{item.link_text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const contentBlocks = () => {
    let key = 1;
    let blocks = content.map(
      (item) => {
        return(
        <View key={key++} >
          {headerMarkup(item)}
          {bodyMarkup(item)}
          {linkMarkup(item)}
        </View>
        );
      }
    );

    return(blocks);
    
  }

  return(
    <View>
      {contentBlocks()}
    </View>
  );
}

const styles = StyleSheet.create({
  h2Wrap: {
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  h2: {
    fontSize: 18
  },
  textWrap: {
    marginBottom: 10
  },
  linkWrap: {
    padding: 5,
    margin: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText: {
    color: 'darkblue',
    fontWeight: 'bold'
  }
});

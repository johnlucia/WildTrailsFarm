import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function DoubleDiamond(size, color) {
  const iconSize = (size) => {
    return size || 25
  }

  const iconColor = (customColor) => {
    return customColor || "black"
  }

  const offset = (forSize) => {
   return(Math.round(iconSize(forSize)*0.4));
  }

  const totalWidth = (forSize) => {
    return(
      iconSize(forSize) * 2 + offset(forSize)
    );
  }

  // flagrant duplication
 
  return(
    <View style={{flexDirection: 'row', width: totalWidth(size)}}>
      <MaterialCommunityIcons name="cards-diamond" size={iconSize(size)} color={iconColor(color)} />
      <MaterialCommunityIcons name="cards-diamond" size={iconSize(size)} color={iconColor(color)} style={{position: 'relative', right: offset(props.size)}} />
    </View>
  )
}

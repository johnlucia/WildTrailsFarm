import React, { useState }  from 'react';
import { Polyline } from 'react-native-maps';

// const Boundaries = props => {
export default function Boundaries({boundaries, onTapBoundary, activeTrailID, visible}) {
  if(!visible) {return(null);}
  let boundaryLines
  const boundaryPolyLines = () => {
    boundaryLines = boundaries.map((boundary) => {
      let boundaryActive = activeTrailID === boundary.id
      return( <Polyline 
                key={boundary.id}
                coordinates={boundary.coordinates}
                strokeColor={boundary.color}
                lineDashPattern={[2,4,8,4]}
                lineJoin='round'
                strokeWidth={boundaryActive ? 6:1}
                tappable={true}
                onPress={() => onTapBoundary(boundary)}
              />
            )
    })

    return(boundaryLines);
  }

  return(boundaryPolyLines());
}

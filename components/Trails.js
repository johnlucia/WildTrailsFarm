import { useState }  from 'react';
import { Polyline } from 'react-native-maps';

export default function Trails({trails, onTapTrail, dashPattern, activeTrailID, visible}) {
  if(!visible) {return(null);}

  let trailLines
  const trailPolyLines = () => {
    trailLines = trails.map((trail) => {
      let trailActive = activeTrailID === trail.uid
      return( <Polyline 
                key={trail.id}
                coordinates={trail.coordinates}
                strokeColor={trail.color}
                lineDashPattern={dashPattern}
                lineJoin='round'
                strokeWidth={trailActive ? 7:3}
                tappable={true}
                onPress={() => onTapTrail(trail)}
              />
            )
    })

    return(trailLines);
  }

  return(trailPolyLines());
}

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
 
export default function TrailInfo({trail, visible, onCloseTrailInfo}) {
  const [closedIt, setClosedIt] = useState(false);

  useEffect(() => {
    if(visible && !closedIt) {
      _panel.show(
        {toValue: 250}
      );
    }

    if(closedIt) {
      onCloseTrailInfo();
      setClosedIt(false);
    }
  });

  const closePanel = () => {
    _panel.hide();
    setClosedIt(true);
  }

  if(!trail) { return null; }

  const difficultyIcon = (level=0) => {
    const icons = [
      <MaterialCommunityIcons name="chart-multiline" size={32} color="black" />,
      <MaterialCommunityIcons name="brightness-1"    size={32} color="limegreen" />,
      <MaterialCommunityIcons name="checkbox-blank"  size={32} color="dodgerblue" />,
      <MaterialCommunityIcons name="cards-diamond"   size={32} color="black" />
    ]
    return icons[level]
  }

  const lengthText = () => {
    if(!trail.length) {return(null);}
    return(
      <View style={styles.info}>
        <Text style={styles.infoText}>Length: {trail.length}</Text>
      </View>
    );
  }
  
  return (
    <GestureHandlerRootView>
    <SlidingUpPanel ref={c => _panel = c} onBottomReached={closePanel} backdropOpacity={0.1} >
      <View style={styles.overlayWrap}>
        <View style={styles.title}>
          {difficultyIcon(trail.level)}
          <View style={styles.titleTextWrap}>
            <Text style={styles.titleText}>{trail.name}</Text>
          </View>
        </View>
        { lengthText() }
        <View style={styles.info}>
          <Text style={styles.infoText}>{trail.description}</Text>
        </View>
        <View style={styles.closeButton}>
          <TouchableWithoutFeedback onPress={closePanel}>
            <MaterialCommunityIcons name="close-circle"   size={32} color="black" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SlidingUpPanel>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlayWrap: {
    flex:1,
    backgroundColor: 'rgba(255,255,255, 0.75)',
    width: '100%',
    padding: 20,
    borderRadius: 10
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 2,
  },
  titleTextWrap: {
    marginLeft: 15
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    paddingVertical: 15,
  },
  infoText: {
    fontSize: 16,
  }
});

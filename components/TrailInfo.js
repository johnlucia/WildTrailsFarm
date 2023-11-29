import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
export default function TrailInfo({trail, visible, onCloseTrailInfo}) {
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
    <Modal animationType="slide" transparent={true} visible={visible} >
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
          <Pressable onPress={onCloseTrailInfo}>
            <MaterialCommunityIcons name="close-circle"   size={32} color="black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayWrap: {
    flex:1,
    backgroundColor: 'rgba(255,255,255, 0.85)',
    width: '100%',
    maxHeight: '95%',
    padding: 20,
    paddingBottom: 60,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 25
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

import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DoubleDiamond from '../components/DoubleDiamond';

export default function PointInfo({point, visible, onClosePointInfo}) {
  if(!point) { return null; }

  const iconSource = () => {
    let color = point.color || "black";
    let icon =  point.icon || "md-pin";
    let source = point.icon_source || "Ionicons";

    if (source == "Ionicons") {
      return(
        <Ionicons name={icon} size={32} color={color} />
      );
    }else if (source == "MaterialCommunityIcons") {
      return(
        <MaterialCommunityIcons name={icon} size={32} color={color} />
      );
    }else if (source == "DoubleDiamond") {
      return(
        <DoubleDiamond name={icon} size={32} color={color} />
      );
    }
  }

  const pointIcon = () => {
    if(point.icon) {
      return(iconSource());
    }

    const shelterIcon = <Ionicons name="md-home" size={32} color="black" />
    const parkingIcon = <Ionicons name="md-car"  size={32} color="mediumblue" />
    const poiIcon =     <Ionicons name="md-pin"  size={32} color="black" />
    const defaultIcon = <Ionicons name="md-snow" size={32} color="lightblue" />

    if(point.kind.toLowerCase().indexOf('shelter') > -1)        { return(shelterIcon) }
    if(point.kind.toLowerCase().indexOf('parking')> -1)         { return(parkingIcon) }
    if(point.kind.toLowerCase().indexOf('pointofinterest')> -1) { return(poiIcon) }

    return(defaultIcon);
  }

  if(!point) { return null; }
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <View style={styles.overlayWrap}>
        <View style={styles.title}>
          {pointIcon()}
          <View style={styles.titleTextWrap}>
            <Text style={styles.titleText}>{point.name}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.infoText}>{point.description}</Text>
        </View>
        <View style={styles.closeButton}>
          <Pressable onPress={onClosePointInfo}>
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
    padding: 20,
    paddingBottom: 60,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
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
    marginBottom: 15
  },
  titleTextWrap: {
    marginLeft: 15
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    paddingVertical: 15
  },
  infoText: {
    fontSize: 16,
  }
});

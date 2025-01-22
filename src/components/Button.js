import React from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    // a altura e a largura vão ser baseadas no tamanho da tela do dispositivo e divididas por 4
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4, 
    paddding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#B5DAE8',
  },
  buttonDouble: {
    width: (Dimensions.get('window').width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get('window').width / 4) * 3,
  },
})

export default props => {
  const stylesButton = [styles.button]
  if (props.double) stylesButton.push(styles.buttonDouble)
  if (props.triple) stylesButton.push(styles.buttonTriple)
  if (props.operation) stylesButton.push(styles.operationButton)
  return (
    <TouchableHighlight onPress={() => props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableHighlight>
  )
}
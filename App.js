import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);	
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  addDigit = n => {
    const clearDisplayValue = displayValue === '0' || clearDisplay

    if (n === '.' && !clearDisplay && displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplayValue ? '' : displayValue
    const valueOfDisplay = currentValue + n
    setDisplayValue(valueOfDisplay);
    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(valueOfDisplay)
      const valuesArr = [...values]
      valuesArr[current] = newValue
      setValues(valuesArr)
    }
  }

  clearMemory = () => {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0])
    setCurrent(0)
  }

  setOp = op => {
    if(current === 0) {
      setOperation(op)
      setCurrent(1)
      setClearDisplay(true)
    } else {
      const equals = op === '='
      const valuesArr = [...values]
      try {
        valuesArr[0] = eval(`${valuesArr[0]} ${operation} ${valuesArr[1]}`)
      } catch (e) {
        valuesArr[0] = values[0]
      }
      
      valuesArr[1] = 0
      setDisplayValue(`${valuesArr[0]}`)
      setOperation(equals ? null : op)
      setCurrent(equals ? 0 : 1)
      setClearDisplay(true)
      setValues(valuesArr)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
          <Button label='AC' triple onClick={clearMemory}/>
          <Button label='/' operation onClick={setOp} />
          <Button label='7' onClick={addDigit}/>
          <Button label='8' onClick={addDigit}/>
          <Button label='9' onClick={addDigit}/>
          <Button label='*' operation onClick={setOp} />
          <Button label='4' onClick={addDigit}/>
          <Button label='5' onClick={addDigit}/>
          <Button label='6' onClick={addDigit}/>
          <Button label='-' operation onClick={setOp} />
          <Button label='1' onClick={addDigit} />
          <Button label='2' onClick={addDigit} />
          <Button label='3' onClick={addDigit} />
          <Button label='+' operation onClick={setOp} />
          <Button label='0' double onClick={addDigit} />
          <Button label='.' onClick={addDigit} />
          <Button label='=' operation onClick={setOp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

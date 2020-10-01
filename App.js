import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Map, Modal, Panel, Input, List } from './Components';

export default function App() {

  const [puntos, setPuntos] = useState([])
  const [nombre, setNombre] = useState('')
  const [puntoTemp, setPuntoTemp] = useState({})
  const [visibilityFilter, setVisibilityFilter ] = useState('new_punto') //puede tener 'new_punto' o 'all_puntos'
  const [visibility, setVisibility ] = useState(false)

  const handleLongPress = ({ nativeEvent }) => {
    setVisibilityFilter('new_punto')
    setPuntoTemp(nativeEvent.coordinate)
    setVisibility(true)
  }
  
  const handleChangeText = text => {
    setNombre(text)
  }

  const handleSubmit = () => {
    const newPunto = { coordinate: puntoTemp, name: nombre};
    setPuntos(puntos.concat(newPunto))
    setVisibility(false)
    setNombre('')
  }

  const handleLista = () => {
    setVisibilityFilter('all_puntos')
    setVisibility(true)
  }

  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress}/>
      <Panel onPressLeft={handleLista} textLeft='Lista'/>
      <Modal visibility={visibility}>
        {visibilityFilter === 'new_punto'?
        <View style={styles.form}>
          <Input title='Nombre' placeholder='Nombre del punto' onChangeText={handleChangeText}/>
          <Button title='Aceptar' onPress={handleSubmit} />  
        </View>
        : <List puntos={puntos} closeModal={() => setVisibility(false) } />
      }
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  form:{
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

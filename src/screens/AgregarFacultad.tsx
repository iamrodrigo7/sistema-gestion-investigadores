import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import apiFacultades from '../api/axiosFacultades';

const AgregarFacultad = () => {
  const [nombre, setNombre] = useState('');
  const [siglas, setSiglas] = useState('');
  const [carreras, setCarreras] = useState('');
  const [decano, setDecano] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleAgregar = async () => {
    if (!nombre || !siglas || !carreras || !decano || !telefono || !correo) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }

    const nuevaFacultad = {
      nombre,
      siglas,
      carreras: carreras.split(',').map((c) => c.trim()),
      decano,
      telefono,
      correo,
    };

    try {
      await apiFacultades.post('/facultades', nuevaFacultad);
      Alert.alert('Éxito', 'Facultad agregada correctamente');

      // Limpiar campos
      setNombre('');
      setSiglas('');
      setCarreras('');
      setDecano('');
      setTelefono('');
      setCorreo('');
    } catch (error) {
      console.error('Error al agregar:', error);
      Alert.alert('Error', 'No se pudo agregar la facultad');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agregar Facultad</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Siglas" value={siglas} onChangeText={setSiglas} />
      <TextInput style={styles.input} placeholder="Carreras (separadas por coma)" value={carreras} onChangeText={setCarreras} />
      <TextInput style={styles.input} placeholder="Decano" value={decano} onChangeText={setDecano} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" />

      <Button title="Agregar Facultad" onPress={handleAgregar} />
    </ScrollView>
  );
};

export default AgregarFacultad;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});

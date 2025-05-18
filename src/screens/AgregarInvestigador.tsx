import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/axios';

const AgregarInvestigador = () => {
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [gradoAcademico, setGradoAcademico] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [facultad, setFacultad] = useState('');

  const navigation = useNavigation();

  const agregarInvestigador = async () => {
    if (!nombre || !especialidad || !gradoAcademico || !correo || !telefono || !facultad) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      await api.post('/investigadores', {
        nombre,
        especialidad,
        gradoAcademico,
        correo,
        telefono,
        facultad
      });

      Alert.alert('Éxito', 'Investigador agregado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar:', error);
      Alert.alert('Error', 'No se pudo agregar el investigador');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Investigador</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Especialidad"
        value={especialidad}
        onChangeText={setEspecialidad}
        style={styles.input}
      />

      <TextInput
        placeholder="Grado Académico"
        value={gradoAcademico}
        onChangeText={setGradoAcademico}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Teléfono (8 dígitos)"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
        keyboardType="numeric"
        maxLength={8}
      />

      <TextInput
        placeholder="Facultad"
        value={facultad}
        onChangeText={setFacultad}
        style={styles.input}
      />

      <Button title="AGREGAR" onPress={agregarInvestigador} color="#2196F3" />
    </View>
  );
};

export default AgregarInvestigador;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

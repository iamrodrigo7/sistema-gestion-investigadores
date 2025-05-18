import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../api/axios';

const EditarInvestigador = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { investigador } = route.params;

  const [nombre, setNombre] = useState(investigador.nombre);
  const [especialidad, setEspecialidad] = useState(investigador.especialidad);
  const [gradoAcademico, setGradoAcademico] = useState(investigador.gradoAcademico);
  const [correo, setCorreo] = useState(investigador.correo);
  const [telefono, setTelefono] = useState(investigador.telefono);
  const [facultad, setFacultad] = useState(investigador.facultad);

  const handleActualizar = async () => {
    try {
      await api.put(`/investigadores/${investigador._id}`, {
        nombre,
        especialidad,
        gradoAcademico,
        correo,
        telefono,
        facultad
      });
      Alert.alert('Éxito', 'Investigador actualizado');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Alert.alert('Error', 'No se pudo actualizar el investigador');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Investigador</Text>

      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      <TextInput style={styles.input} value={especialidad} onChangeText={setEspecialidad} placeholder="Especialidad" />
      <TextInput style={styles.input} value={gradoAcademico} onChangeText={setGradoAcademico} placeholder="Grado académico" />
      <TextInput style={styles.input} value={correo} onChangeText={setCorreo} placeholder="Correo" keyboardType="email-address" />
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={facultad} onChangeText={setFacultad} placeholder="Facultad" />

      <Button title="Actualizar" onPress={handleActualizar} color="#2196F3" />
    </View>
  );
};

export default EditarInvestigador;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8
  }
});

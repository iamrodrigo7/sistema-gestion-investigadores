import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import apiFacultades from '../api/axiosFacultades';

const EditarFacultad = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { facultad } = route.params;

  const [nombre, setNombre] = useState(facultad.nombre);
  const [siglas, setSiglas] = useState(facultad.siglas);
  const [carreras, setCarreras] = useState(facultad.carreras.join(', '));
  const [decano, setDecano] = useState(facultad.decano);
  const [telefono, setTelefono] = useState(facultad.telefono);
  const [correo, setCorreo] = useState(facultad.correo);

  const handleActualizar = async () => {
    if (!nombre || !siglas || !carreras || !decano || !telefono || !correo) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }

    const datosActualizados = {
      nombre,
      siglas,
      carreras: carreras.split(',').map((c) => c.trim()),
      decano,
      telefono,
      correo,
    };

    try {
      await apiFacultades.put(`/facultades/${facultad._id}`, datosActualizados);
      Alert.alert('Éxito', 'Facultad actualizada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Alert.alert('Error', 'No se pudo actualizar la facultad');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Facultad</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Siglas" value={siglas} onChangeText={setSiglas} />
      <TextInput
        style={styles.input}
        placeholder="Carreras (separadas por coma)"
        value={carreras}
        onChangeText={setCarreras}
      />
      <TextInput style={styles.input} placeholder="Decano" value={decano} onChangeText={setDecano} />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Button title="Actualizar Facultad" onPress={handleActualizar} color="#2196F3" />
    </ScrollView>
  );
};

export default EditarFacultad;

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

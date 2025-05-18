import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import apiFacultades from '../api/axiosFacultades';

const ListaFacultades = () => {
  const [facultades, setFacultades] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      obtenerFacultades();
    }
  }, [isFocused]);

  const obtenerFacultades = async () => {
    try {
      console.log('🔄 Actualizando lista de facultades...');

      // Limpiar momentáneamente para forzar re-render
      setFacultades([]);

      const response = await apiFacultades.get('/facultades');

      // Pequeño delay para que el cambio se note
      setTimeout(() => {
        setFacultades(response.data);
      }, 100);
    } catch (error) {
      console.error('Error al obtener facultades:', error);
    }
  };

  const eliminarFacultad = async (id: string) => {
    try {
      console.log('🗑 Eliminando facultad con ID:', id);
      await apiFacultades.delete(`/facultades/${id}`);
      await obtenerFacultades();
      Alert.alert('Eliminado', 'Facultad eliminada correctamente');
    } catch (error) {
      console.error('❌ Error al eliminar facultad:', error);
      Alert.alert('Error', 'No se pudo eliminar la facultad');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditarFacultad', { facultad: item })}
      >
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>Siglas: {item.siglas}</Text>
        <Text>Carreras: {item.carreras.join(', ')}</Text>
        <Text>Decano: {item.decano}</Text>
        <Text>Teléfono: {item.telefono}</Text>
        <Text>Correo: {item.correo}</Text>
      </TouchableOpacity>

      <View style={styles.botonEliminarWrapper}>
        <TouchableOpacity
          onPress={() => eliminarFacultad(item._id)}
          style={styles.botonEliminar}
        >
          <Text style={styles.textoEliminar}>ELIMINAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Facultades</Text>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('AgregarFacultad')}
      >
        <Text style={styles.textoAgregar}>AGREGAR FACULTAD</Text>
      </TouchableOpacity>

      <FlatList
        data={facultades}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={{ marginTop: 16 }}
        extraData={facultades} // 👈 fuerza el re-render
      />
    </View>
  );
};

export default ListaFacultades;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonAgregar: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoAgregar: {
    color: 'white',
    fontWeight: 'bold',
  },
  botonEliminarWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  botonEliminar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
  },
});

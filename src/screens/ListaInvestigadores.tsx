import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../api/axios';

const ListaInvestigadores = () => {
  const [investigadores, setInvestigadores] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      obtenerInvestigadores();
    }
  }, [isFocused]);

  const obtenerInvestigadores = async () => {
    try {
      const response = await api.get('/investigadores');
      setInvestigadores(response.data);
    } catch (error) {
      console.error('Error al obtener investigadores:', error);
    }
  };

  const eliminarInvestigadorDirectamente = async (id: string) => {
    try {
      console.log('🗑 Eliminando investigador con ID:', id);
      await api.delete(`/investigadores/${id}`);
      await obtenerInvestigadores();
      console.log('✅ Investigador eliminado correctamente');
    } catch (error) {
      console.error('❌ Error al eliminar investigador:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditarInvestigador', { investigador: item })}
      >
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>Especialidad: {item.especialidad}</Text>
        <Text>Grado: {item.gradoAcademico}</Text>
        <Text>Correo: {item.correo}</Text>
        <Text>Teléfono: {item.telefono}</Text>
        <Text>Facultad: {item.facultad}</Text>
      </TouchableOpacity>

      <View style={styles.botonEliminarWrapper}>
        <TouchableOpacity
          onPress={() => eliminarInvestigadorDirectamente(item._id)}
          style={styles.botonEliminar}
        >
          <Text style={styles.textoEliminar}>ELIMINAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Investigadores</Text>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('Agregar')}
      >
        <Text style={styles.textoAgregar}>AGREGAR INVESTIGADOR</Text>
      </TouchableOpacity>

      <FlatList
        data={investigadores}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

export default ListaInvestigadores;

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

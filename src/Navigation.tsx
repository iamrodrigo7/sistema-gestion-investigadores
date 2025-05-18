import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';

import AgregarInvestigador from './screens/AgregarInvestigador';
import EditarInvestigador from './screens/EditarInvestigador';
import AgregarFacultad from './screens/AgregarFacultad';
import EditarFacultad from './screens/EditarFacultad';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tabs principales */}
        <Stack.Screen name="Inicio" component={MainTabs} options={{ headerShown: false }} />

        {/* Pantallas secundarias */}
        <Stack.Screen name="Agregar" component={AgregarInvestigador} />
        <Stack.Screen name="EditarInvestigador" component={EditarInvestigador} />
        <Stack.Screen name="AgregarFacultad" component={AgregarFacultad} />
        <Stack.Screen name="EditarFacultad" component={EditarFacultad} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

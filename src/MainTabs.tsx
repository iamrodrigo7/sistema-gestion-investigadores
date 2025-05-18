import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ListaInvestigadores from './screens/ListaInvestigadores';
import ListaFacultades from './screens/ListaFacultades';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Investigadores"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'list';

          if (route.name === 'Investigadores') iconName = 'person';
          if (route.name === 'Facultades') iconName = 'school';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Investigadores" component={ListaInvestigadores} />
      <Tab.Screen name="Facultades" component={ListaFacultades} />
    </Tab.Navigator>
  );
};

export default MainTabs;

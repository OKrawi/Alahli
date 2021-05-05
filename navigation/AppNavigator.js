import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

import { DrawerNavigator } from './CalculatorNavigator';

const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <DrawerNavigator />
      <StatusBar style="light" backgroundColor={theme.primary}/>
    </NavigationContainer>
  );
};

export default AppNavigator;

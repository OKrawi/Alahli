import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next';
import { useRTL } from '../contexts/RTLContext';

import CalculatorScreen from '../screens/CalculatorScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutMeScreen from '../screens/AboutMeScreen';

const CalculatorStackNavigator = createStackNavigator();
const ApplicationDrawerNavigator = createDrawerNavigator();

export const CalculatorNavigator = () => {
  return (
    <CalculatorStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CalculatorStackNavigator.Screen
        name="Calculator"
        component={CalculatorScreen}
      />
      <CalculatorStackNavigator.Screen
        name="Results"
        component={ResultsScreen}
      />
    </CalculatorStackNavigator.Navigator>
  );
};

export const DrawerNavigator = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const rtl = useRTL();

  return (
    <ApplicationDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: theme.accent
      }}
      drawerPosition={rtl ? 'right' : 'left'}
      drawerType="front"
    >
      <ApplicationDrawerNavigator.Screen
        name={t('navigation.calculator')}
        component={CalculatorNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-calculator' : 'ios-calculator'}
              size={23}
              color={theme.primary}
            />
          )
        }}
      />
      <ApplicationDrawerNavigator.Screen
        name={t('navigation.settings')}
        component={SettingsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-options' : 'ios-options'}
              size={23}
              color={theme.primary}
            />
          )
        }}
      />
      <ApplicationDrawerNavigator.Screen
        name={t('navigation.about_me')}
        component={AboutMeScreen}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-person-circle' : 'ios-person-circle'}
              size={23}
              color={theme.primary}
            />
          )
        }}
      />
    </ApplicationDrawerNavigator.Navigator>
  );
};
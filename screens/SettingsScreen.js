import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext'
import { useRTL } from '../contexts/RTLContext';
import { Restart } from 'fiction-expo-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors'

const SettingsScreen = () => {
  const theme = useTheme();
  const toggleTheme = useThemeUpdate();
  const rtl = useRTL();
  const { t } = useTranslation();

  const switchLanguage = (lang, rtl) => {

    Alert.alert(
      t('settings.warning'),
      t('settings.language_change_warning'),
      [
        {
          text: t('settings.negative'),
          onPress: () => { return; },
          style: "cancel"
        },
        {
          text: t('settings.affirmative'),
          onPress: () => {
            try {
              AsyncStorage.setItem('@lang', lang)
                .then(AsyncStorage.setItem('@rtl', JSON.stringify(rtl)))
                .then(Restart());
            } catch (e) {
              console.log(err);
            }
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageButtonContianer}>
        <Text style={styles.label}>{t('settings.select_lang')}</Text>
        {rtl ?
          <TouchableOpacity
            style={{ ...styles.touchableOpacity, backgroundColor: theme.primary }}
            onPress={switchLanguage.bind(null, 'en', false)}>
            <Text style={{ ...styles.themeText }}>English</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={{ ...styles.touchableOpacity, backgroundColor: theme.primary }}
            onPress={switchLanguage.bind(null, 'ar', true)}>
            <Text style={{ ...styles.themeText }}>العربية</Text>
          </TouchableOpacity>
        }
      </View>
      <View style={styles.themesContainer}>
        <Text style={styles.label}>{t('settings.select_theme')}</Text>

        <TouchableOpacity
          style={{ ...styles.touchableOpacity, backgroundColor: Colors.primaryDark }}
          onPress={toggleTheme.bind(null, 'dark')}>
          <Text style={{ ...styles.themeText }}>{t('settings.color_dark')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.touchableOpacity, backgroundColor: Colors.primaryFuschia }}
          onPress={toggleTheme.bind(null, 'fuschia')}>
          <Text style={{ ...styles.themeText }}>{t('settings.color_fuschia')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.touchableOpacity, backgroundColor: Colors.primaryLight }}
          onPress={toggleTheme.bind(null, 'light')}>
          <Text style={{ ...styles.themeText }}>{t('settings.color_light')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1
  },
  button: {
    flex: 1
  },
  languageButtonContianer: {
    margin: 30
  },
  themesContainer: {
    margin: 30
  },
  touchableOpacity: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 15
  },
  themeText: {
    color: 'white',
    fontFamily: 'boutros',
    fontSize: 15
  },
  label: {
    fontFamily: 'boutros',
    marginBottom: 8,
    fontSize: 18
  }
});

export default SettingsScreen;
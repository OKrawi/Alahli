import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
 
const AboutMeScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const args = {
    number: '00966500198465', 
    prompt: true 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('about_me.greeting')}</Text>
      <Text style={styles.text}>{t('about_me.intro')}</Text>
      <Text style={styles.text}>{t('about_me.prompt')}</Text>
      <TouchableOpacity
        style={{ ...styles.contactOption, backgroundColor: theme.primary }}
        onPress={() => { call(args).catch(console.error) }}>
        <Text style={{ ...styles.text, color: 'white' }}>{t('about_me.phone')}<Ionicons
          name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
          size={23}
          color="white"
        /></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'boutros',
    fontSize: 20,
    marginVertical: 5,
  },
  contactOption: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 30
  },
});

export default AboutMeScreen;
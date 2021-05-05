import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderIcon = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/ncbIcon.png')}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={{ ...styles.header, color: theme.primary }}>{t('alahli_calc.alahli_calc_title')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 30
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        fontFamily: 'boutros',
    },
    header: {
        fontSize: 30,
        fontFamily: 'boutros'
    }
})

export default HeaderIcon;

import React, {useState, useCallback} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import VerticalSpace from '../../components/VerticalSpace';
import LanguageCard from '../../components/Cards/LanguageCard';
import SolidButton from '../../components/Button/SolidButton';
import BlurContainer from '../../components/BlurContainer';

import {DULL, THEME, WHITE} from '../../constants/colors';
import images from '../../constants/images';
import {sR, wR} from '../../constants/dimensions';
import {AppNavigationProps} from '../../constants/navigationTypes';
import i18n from '../../localization/i18n';
import {PROXIMA_NOVA_REGULAR} from '../../constants/fonts';
import HorizontalSpace from '../../components/HorizontalSpace';
import CustomCheckbox from '../../components/CustomCheckbox';

const SelectLanguageScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const {t} = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ur'>('en');

  const handleSelectLanguage = useCallback((language: 'en' | 'ur') => {

    console.log(language);
    
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  const goToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <BlurContainer onBackPress={goBack} headerLabel={`Select Language`}>
      <CustomCheckbox
        items={[
          {label: 'English', value: 'en'},
          {label: 'Urdu', value: 'ur'},
        ]}
        onSelect={selectedValue => handleSelectLanguage(selectedValue)}
      />

      <VerticalSpace h={2} />

      <Text
        style={{
          color: DULL,
          fontFamily: PROXIMA_NOVA_REGULAR,
          fontSize: sR,
        }}>
        Select Language to proceed further.
      </Text>

      <VerticalSpace h={4} />

      <SolidButton
        label={`Next`}
        size="xl"
        customButtonStyle={{width: wR * 84}}
        onPress={goToRegister}
      />

      {/*  
      <Image source={images.LOGO} style={styles.logo} /> 

      <VerticalSpace h={6} />

      <LanguageCard
        language="en"
        selectedLanguage={selectedLanguage}
        onPress={() => handleSelectLanguage("en")}
      />

      <VerticalSpace h={2} />

      <LanguageCard
        language="ur"
        selectedLanguage={selectedLanguage}
        onPress={() => handleSelectLanguage("ur")}
      />

      <VerticalSpace h={2} />

      <SolidButton label={t(`SELECT_LANGUAGE.NEXT`)} size="xl" onPress={goToRegister} /> */}
    </BlurContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    height: sR * 10,
    width: sR * 10,
  },
});

export default SelectLanguageScreen;

import React, {useState, useCallback} from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import CustomCheckbox from '../../components/Checkbox';

import VerticalSpace from '../../components/VerticalSpace';
import SolidButton from '../../components/Button/SolidButton';
import BlurContainer from '../../components/BlurContainer';

import {DULL} from '../../constants/colors';
import {sR, wR} from '../../constants/dimensions';
import {AppNavigationProps} from '../../constants/navigationTypes';
import i18n from '../../localization/i18n';
import {PROXIMA_NOVA_REGULAR} from '../../constants/fonts';

const SelectLanguageScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const {t} = useTranslation();

  const handleSelectLanguage = useCallback((language: 'en' | 'ur') => {
    i18n.changeLanguage(language);
  }, []);

  const goToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <BlurContainer onBackPress={goBack} headerLabel={t(`SELECT_LANGUAGE.SELECT_LANGUAGE`)}>
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
       {t(`SELECT_LANGUAGE.MESSAGE`)}
      </Text>

      <VerticalSpace h={4} />

      <SolidButton
        label={t(`SELECT_LANGUAGE.NEXT`)}
        size="xl"
        customButtonStyle={{width: wR * 84}}
        onPress={goToRegister}
      />
    </BlurContainer>
  );
};

export default SelectLanguageScreen;

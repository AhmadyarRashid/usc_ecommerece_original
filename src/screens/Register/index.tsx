import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {TickSquare} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import {AxiosRequestHeaders} from 'axios';

import HeaderPrimary from '../../components/Header/HeaderPrimary';
import VerticalSpace from '../../components/VerticalSpace';
import PhoneInput from '../../components/TextInput/PhoneInput';
import HorizontalSpace from '../../components/HorizontalSpace';
import TextButton from '../../components/Button/TextButton';
import SolidButton from '../../components/Button/SolidButton';
import BlurContainer from '../../components/BlurContainer';

import {BLACK, PINBALL, RED_DOOR, THEME, WHITE} from '../../constants/colors';
import {hR, sR, width, wR} from '../../constants/dimensions';
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_EXTRABOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../constants/fonts';
import useToggle from '../../hooks/useToggle';
import {AppNavigationProps} from '../../constants/navigationTypes';
import useApiHook from '../../hooks/rest/useApi';
import {displayToast, validatePhone} from '../../constants/functions';
import {setContactFields} from '../../redux/slices/contact';
import {openURL} from '../../constants/functions';
import {useTranslation} from 'react-i18next';

const WEBURL = `https://usc.org.pk/`;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useDispatch();
  const [registerConsent, toggleRegisterConsent] = useToggle(true);
  const {handleRestApi, restApiLoading} = useApiHook();
  const {t} = useTranslation();

  const [mobile, setMobile] = useState<string | null>(null);

  const registerUser = async () => {
    if (!registerConsent) {
      return displayToast({
        type: 'error',
        text1: 'Error',
        text2: 'Consent is required!',
      });
    }

    if (!validatePhone(mobile)) {
      return displayToast({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid phone number',
      });
    }

    await handleRestApi({
      method: 'post',
      url: 'send_otp',
      data: {mobile_number: mobile},
      headers: {Authorization: 'none'} as AxiosRequestHeaders,
    });

    dispatch(setContactFields({contactInfo: mobile}));
    goToVerifyPhone();
  };

  const goToVerifyPhone = useCallback(() => {
    navigation.navigate('VerifyPhone');
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <BlurContainer onBackPress={goBack} headerLabel={t(`REGISTER.REGISTER`)}>
        <Text style={styles.verificationMessageText}>
          {t(`REGISTER.VERIFICATION_MESSAGE`)}
        </Text>

        <VerticalSpace h={2} />

        <PhoneInput
          extraInputStyle={styles.extraInputStyle}
          placeholder={t(`REGISTER.ENTER_PHONE_NUMBER`)}
          maxLength={11}
          onChangeText={e => setMobile(e)}
        />

        <VerticalSpace h={2} />

        <SolidButton
          size={`xl`}
          label={t(`REGISTER.AGREE_CONTINUE`)}
          onPress={registerUser}
          customButtonStyle={styles.customButtonStyle}
        />
      </BlurContainer>

      {restApiLoading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  verificationMessageText: {
    fontSize: sR * 1.2,
    color: BLACK,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
  extraInputStyle: {
    width: wR * 84,
    paddingVertical: hR * 1.2,
    borderColor: THEME,
  },
  customButtonStyle: {
    width: wR * 84,
  },
});

export default RegisterScreen;

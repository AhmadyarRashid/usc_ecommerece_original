import React, {useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import VerticalSpace from '../../components/VerticalSpace';
import SolidButton from '../../components/Button/SolidButton';
import LottieAnimation from '../../components/LottieAnimation';

import {CHECK} from '../../constants/animations';
import {sR, wR} from '../../constants/dimensions';
import {BLACK, FLINT_STONE, WHITE} from '../../constants/colors';
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../constants/fonts';
import {AppNavigationProps} from '../../constants/navigationTypes';
import BlurContainer from '../../components/BlurContainer';

const AccountCreationSuccessScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const {t} = useTranslation();

  const goToAppBottomTab = useCallback(() => {
    navigation.navigate('Address');
  }, [navigation]);

  return (
    <BlurContainer
      // onBackPress={goBack}
      headerLabel={t(`ACCOUNT_CREATION_SUCCESS.AUTHENTICATED`)}>
      <LottieAnimation
        source={CHECK}
        customStyle={styles.checkLottieAnimation}
        loop={true}
      />

      <VerticalSpace h={1} />

      <Text style={styles.congratulationsText}>
        {t(`ACCOUNT_CREATION_SUCCESS.ACCOUNT_CREATION_SUCCESS`)}
      </Text>

      <VerticalSpace h={1} />

      <Text style={styles.partOfUsText}>
        {t(`ACCOUNT_CREATION_SUCCESS.MESSAGE`)}
      </Text>

      <VerticalSpace h={1} />

      <SolidButton
        label={t(`ACCOUNT_CREATION_SUCCESS.SETUP_ADDRESS_BUTTON`)}
        size={`xl`}
        onPress={goToAppBottomTab}
        customButtonStyle={{
          width: wR * 84,
        }}
      />
    </BlurContainer>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wR * 4,
  },
  checkLottieAnimation: {height: sR * 12, width: sR * 12},
  congratulationsText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.2,
    fontWeight: 'bold',
  },
  partOfUsText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    fontSize: sR,
    textAlign: 'center',
  },
});

export default AccountCreationSuccessScreen;

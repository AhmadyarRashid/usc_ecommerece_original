import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import VerticalSpace from "../../components/VerticalSpace";
import SolidButton from "../../components/Button/SolidButton";
import LottieAnimation from "../../components/LottieAnimation";

import { CHECK } from "../../constants/animations";
import { sR, wR } from "../../constants/dimensions";
import { BLACK, FLINT_STONE, WHITE } from "../../constants/colors";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";

const AccountCreationSuccessScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { t } = useTranslation();

  const goToAppBottomTab = useCallback(() => {
    navigation.navigate("Address");
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <LottieAnimation
        source={CHECK}
        customStyle={styles.checkLottieAnimation}
        loop={true}
      />

      <VerticalSpace h={2} />

      <Text style={styles.congratulationsText}>
        {t(`ACCOUNT_CREATION_SUCCESS.ACCOUNT_CREATION_SUCCESS`)}
      </Text>

      <VerticalSpace h={2} />

      <Text style={styles.partOfUsText}>
        {t(`ACCOUNT_CREATION_SUCCESS.MESSAGE`)}
      </Text>

      <VerticalSpace h={2} />

      <SolidButton
        label={t(`ACCOUNT_CREATION_SUCCESS.SETUP_ADDRESS_BUTTON`)}
        size={`xl`}
        onPress={goToAppBottomTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wR * 4,
  },
  checkLottieAnimation: { height: sR * 12, width: sR * 12 },
  congratulationsText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 2,
  },
  partOfUsText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    fontSize: sR * 1.2,
    textAlign: "center",
  },
});

export default AccountCreationSuccessScreen;

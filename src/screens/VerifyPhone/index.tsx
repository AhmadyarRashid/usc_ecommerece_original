import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import SolidButton from "../../components/Button/SolidButton";
import InputOTP from "../../components/TextInput/InputOTP";
import TextButton from "../../components/Button/TextButton";

import { BLACK, FLINT_STONE, WHITE } from "../../constants/colors";
import { sR, wR } from "../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";

interface VerifyPhoneScreenProps {}

const VerifyPhoneScreen: React.FC<VerifyPhoneScreenProps> = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goToAccountCreationSuccess = useCallback(() => {
    navigation.navigate("AccountCreationSuccess");
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={`Verify your identity`} onPress={goBack} />

      <VerticalSpace h={2} />

      <View style={styles.childContainer}>
        <View>
          <Text style={styles.enterCodeText}>
            Enter the 6-digit code we texted to{`\n`}+92 345 7898765
          </Text>

          <VerticalSpace h={2} />

          <Text style={styles.helpText}>
            This helps us keep your account secure by verifying that it's really
            you.
          </Text>

          <VerticalSpace h={2} />

          <InputOTP />

          <VerticalSpace h={2} />

          <View style={styles.resendOTPContainer}>
            <TextButton label={`Resend OTP`} />
          </View>
        </View>

        <SolidButton
          label={`Verify`}
          size={`xl`}
          onPress={goToAccountCreationSuccess}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  childContainer: {
    paddingHorizontal: wR * 4,
    justifyContent: "space-between",
    flex: 1,
  },
  enterCodeText: {
    fontSize: sR * 1.8,
    color: BLACK,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
  helpText: {
    fontSize: sR * 1.3,
    color: FLINT_STONE,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    opacity: 0.6,
  },
  resendOTPContainer: { alignSelf: "center" },
});

export default VerifyPhoneScreen;

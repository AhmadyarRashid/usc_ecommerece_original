import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AxiosRequestHeaders } from "axios";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import SolidButton from "../../components/Button/SolidButton";
import InputOTP from "../../components/TextInput/InputOTP";
import TextButton from "../../components/Button/TextButton";

import { BLACK, FLINT_STONE, WHITE } from "../../constants/colors";
import { sR, wR } from "../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { displayToast, validateOTP } from "../../constants/functions";
import { RootState } from "../../redux/store";
import useApiHook from "../../hooks/rest/useApi";
import { setAuthFields } from "../../redux/slices/auth";

interface VerifyPhoneScreenProps {}

const VerifyPhoneScreen: React.FC<VerifyPhoneScreenProps> = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const contact = useSelector((state: RootState) => state.contact);
  const { handleRestApi, restApiLoading } = useApiHook();
  const dispatch = useDispatch();

  const [otp, setOTP] = useState<string | null>(null);

  const verifyOTP = async () => {
    if (!validateOTP(otp)) {
      displayToast({
        type: "error",
        text1: "Error",
        text2: "Invalid otp",
      });
      return;
    }

    const data = {
      mobile_number: contact.contactInfo,
      otp: otp,
    };

    const response = await handleRestApi({
      method: "post",
      url: `validate_otp`,
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.status === 200) {
      const { auth_token, user_name } = response?.data?.result;
      
      dispatch(
        setAuthFields({
          accessToken: auth_token,
          userName: user_name,
        })
      );

      goToAccountCreationSuccess();
    } else {
      displayToast({
        type: "error",
        text1: "Error",
        text2: response?.data?.result?.error,
      });
    }
  };

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
            Enter the 6-digit code we texted to{`\n`}
            {contact.contactInfo}
          </Text>

          <VerticalSpace h={2} />

          <Text style={styles.helpText}>
            This helps us keep your account secure by verifying that it's really
            you.
          </Text>

          <VerticalSpace h={2} />

          <InputOTP onTextChange={(val) => setOTP(val)} />

          <VerticalSpace h={2} />

          <View style={styles.resendOTPContainer}>
            <TextButton label={`Resend OTP`} />
          </View>
        </View>

        <SolidButton label={`Verify`} size={`xl`} onPress={verifyOTP} />
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

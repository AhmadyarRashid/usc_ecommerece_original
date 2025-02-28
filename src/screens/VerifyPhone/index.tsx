import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AxiosRequestHeaders } from "axios";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import SolidButton from "../../components/Button/SolidButton";
import InputOTP from "../../components/TextInput/InputOTP";
import TextButton from "../../components/Button/TextButton";
import Loader from "../../components/Loader";

import {
  BLACK,
  FLINT_STONE,
  LUCKY_GREY,
  THEME,
  WHITE,
} from "../../constants/colors";
import { sR, wR } from "../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { displayToast, validateOTP } from "../../constants/functions";
import { RootState } from "../../redux/store";
import useApiHook from "../../hooks/rest/useApi";
import { setAuthFields } from "../../redux/slices/auth";
import { setAddressFields } from "../../redux/slices/address";

const VerifyPhoneScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const contact = useSelector((state: RootState) => state.contact.contactInfo);
  const { handleRestApi, restApiLoading } = useApiHook();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [otp, setOTP] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    if (!resendDisabled) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 60
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [resendDisabled]);

  const verifyOTP = async () => {
    if (!validateOTP(otp)) {
      displayToast({
        type: "error",
        text1: "Error",
        text2: "Invalid OTP",
      });
      return;
    }

    const response = await handleRestApi({
      method: "post",
      url: "validate_otp",
      data: { mobile_number: contact, otp },
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.status === 200) {
      const { auth_token, user_name } = response.data.result;

      dispatch(
        setAuthFields({
          accessToken: auth_token,
          userName: user_name,
        })
      );

      fetchAddresses(auth_token, user_name);
    }
  };

  const fetchAddresses = async (authToken: string, userName: string) => {
    const response = await handleRestApi({
      method: "post",
      url: "user_address_view_all",
      data: { auth_token: authToken, login: userName },
    });

    const { address = [], status } = response?.data?.result || {};
    if (status === 200) {
      dispatch(setAddressFields({ addressList: address }));
      isEmpty(address) ? navigateToSuccess() : navigateToHome();
    }
  };

  const handleResendOTP = async () => {
    await handleRestApi({
      method: "post",
      url: "send_otp",
      data: { mobile_number: contact },
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    displayToast({
      type: "success",
      text1: "OTP sent",
      text2: "A new OTP has been sent to your mobile number.",
    });

    setResendDisabled(true);
    setTimer(60);
  };

  const navigateToSuccess = useCallback(() => {
    navigation.navigate("AccountCreationSuccess");
  }, [navigation]);

  const navigateToHome = useCallback(() => {
    navigation.navigate("AppBottomTab");
  }, [navigation]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label={t(`VERIFY_YOUR_IDENTITY.VERIFY_YOUR_IDENTITY`)} onPress={navigateBack} />

      <VerticalSpace h={2} />

      <View style={styles.childContainer}>
        <View>
          <Text style={styles.enterCodeText}>
            {t(`VERIFY_YOUR_IDENTITY.ENTER_CODE`)} {contact}
          </Text>

          <VerticalSpace h={2} />

          <Text style={styles.helpText}>
          {t(`VERIFY_YOUR_IDENTITY.SECURITY_MESSAGE`)}
          </Text>

          <VerticalSpace h={2} />

          <InputOTP onTextChange={setOTP} />

          <VerticalSpace h={2} />

          <View style={styles.resendOTPContainer}>
            <TextButton
              label={`${t(`VERIFY_YOUR_IDENTITY.RESEND_OTP`)} ${resendDisabled ? `(${timer}s)` : ""}`}
              onPress={handleResendOTP}
              disabled={resendDisabled}
              customLabelStyle={{ color: resendDisabled ? LUCKY_GREY : THEME }}
            />
          </View>
        </View>

        <SolidButton label={t(`VERIFY_YOUR_IDENTITY.VERIFY_BUTTON`)} size="xl" onPress={verifyOTP} />
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
  resendOTPContainer: {
    alignSelf: "center",
  },
});

export default VerifyPhoneScreen;

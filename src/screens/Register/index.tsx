import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { TickSquare } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { AxiosRequestHeaders } from "axios";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import PhoneInput from "../../components/TextInput/PhoneInput";
import HorizontalSpace from "../../components/HorizontalSpace";
import TextButton from "../../components/Button/TextButton";
import SolidButton from "../../components/Button/SolidButton";

import { BLACK, PINBALL, RED_DOOR, THEME, WHITE } from "../../constants/colors";
import { sR, wR } from "../../constants/dimensions";
import { PROXIMA_NOVA_BOLD, PROXIMA_NOVA_REGULAR } from "../../constants/fonts";
import useToggle from "../../hooks/useToggle";
import { AppNavigationProps } from "../../constants/navigationTypes";
import useApiHook from "../../hooks/rest/useApi";
import { displayToast, validatePhone } from "../../constants/functions";
import { setContactFields } from "../../redux/slices/contact";
import { openURL } from "../../constants/functions";
import { useTranslation } from "react-i18next";

const WEBURL = `https://usc.org.pk/`;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useDispatch();
  const [registerConsent, toggleRegisterConsent] = useToggle(true);
  const { handleRestApi, restApiLoading } = useApiHook();
  const { t } = useTranslation();

  const [mobile, setMobile] = useState<string | null>(null);

  const registerUser = async () => {
    if (!registerConsent) {
      return displayToast({
        type: "error",
        text1: "Error",
        text2: "Consent is required!",
      });
    }

    if (!validatePhone(mobile)) {
      return displayToast({
        type: "error",
        text1: "Error",
        text2: "Invalid phone number",
      });
    }

    await handleRestApi({
      method: "post",
      url: "send_otp",
      data: { mobile_number: mobile },
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    dispatch(setContactFields({ contactInfo: mobile }));
    goToVerifyPhone();
  };

  const goToVerifyPhone = useCallback(() => {
    navigation.navigate("VerifyPhone");
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label={t(`REGISTER.REGISTER`)} onPress={goBack} />

      <View style={styles.contentContainer}>
        <View>
          <VerticalSpace h={2} />

          <PhoneInput
            placeholder={t(`REGISTER.PHONE_NUMBER`)}
            maxLength={11}
            onChangeText={(e) => setMobile(e)}
          />

          <VerticalSpace h={2} />

          <Text style={styles.messageText}>
            {t(`REGISTER.VERIFICATION_MESSAGE`)}
          </Text>

          <VerticalSpace h={1} />

          <Text style={styles.infoText}>
            {t(`REGISTER.CONVERTED_SIM_NOTE`)}
          </Text>
        </View>

        <View>
          <View style={styles.consentContainer}>
            <TouchableOpacity onPress={toggleRegisterConsent}>
              <TickSquare
                size={sR * 1.8}
                color={registerConsent ? THEME : PINBALL}
                variant={registerConsent ? "Bold" : "Linear"}
              />
            </TouchableOpacity>

            <HorizontalSpace w={4} />

            <View>
              <Text style={styles.messageText}>
                {t(`REGISTER.AGREE_CONTINUE`)}
              </Text>

              <View style={styles.consentButtonsContainer}>
                <TextButton
                  label={t(`REGISTER.TERMS_CONDITIONS`)}
                  onPress={() => openURL(WEBURL)}
                />

                <Text style={styles.messageText}> {t(`REGISTER.AND`)} </Text>

                <TextButton
                  label={t(`REGISTER.PRIVACY_POLICY`)}
                  onPress={() => openURL(WEBURL)}
                />
              </View>
            </View>
          </View>

          <VerticalSpace h={2} />

          <SolidButton
            size={`xl`}
            label={t(`REGISTER.AGREE_BUTTON`)}
            onPress={registerUser}
          />

          {Platform.OS === "android" && <VerticalSpace h={2} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  contentContainer: {
    paddingHorizontal: wR * 4,
    flex: 1,
    justifyContent: "space-between",
  },
  messageText: {
    color: BLACK,
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.3,
  },
  infoText: {
    color: RED_DOOR,
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR,
  },
  consentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  consentButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RegisterScreen;

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

import { BLACK, PINBALL, THEME, WHITE } from "../../constants/colors";
import { sR, wR } from "../../constants/dimensions";
import { PROXIMA_NOVA_REGULAR } from "../../constants/fonts";
import useToggle from "../../hooks/useToggle";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { RootState } from "../../redux/store";
import useApiHook from "../../hooks/rest/useApi";
import {
  displayToast,
  scheduledNavigation,
  validatePhone,
} from "../../constants/functions";
import { setContactFields } from "../../redux/slices/contact";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useDispatch();
  const [registerConsent, toggleRegisterConsent] = useToggle(true);
  const { handleRestApi, restApiLoading } = useApiHook();

  const [mobile, setMobile] = useState<string | null>(null);

  const registerUser = async () => {
    if (mobile && !validatePhone(mobile)) {
      return displayToast({
        type: "error",
        text1: "Error",
        text2: "Invalid phone number",
      });
    }

    const response = await handleRestApi({
      method: "post",
      url: "send_otp",
      data: { mobile_number: mobile },
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    dispatch(setContactFields({ contactInfo: mobile }));
    scheduledNavigation(goToVerifyPhone);
  };

  const goToVerifyPhone = useCallback(() => {
    navigation.navigate("VerifyPhone");
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label="Register" onPress={() => alert(`MyUSC`)} />

      <View style={styles.contentContainer}>
        <View>
          <VerticalSpace h={2} />

          <PhoneInput
            placeholder="Phone number"
            maxLength={11}
            onChangeText={(e) => setMobile(e)}
          />

          <VerticalSpace h={2} />

          <Text style={styles.messageText}>
            We will send a verification code to your number to confirm it's you.
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
                By selecting Agree & Continue, I agree with
              </Text>

              <View style={styles.consentButtonsContainer}>
                <TextButton label="Terms & Conditions" />

                <Text style={styles.messageText}> & </Text>

                <TextButton label="Privacy Policy" />
              </View>
            </View>
          </View>

          <VerticalSpace h={2} />

          <SolidButton
            size={`xl`}
            label={`Agree & Continue`}
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

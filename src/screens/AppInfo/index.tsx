import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";

import { BLACK, THEME, WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import images from "../../constants/images";
import { sR } from "../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../constants/fonts";

const AppInfoScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { t } = useTranslation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={t(`ABOUT_MYUSC.ABOUT_MYUSC`)} onPress={goBack} />

      <View style={styles.contentContainer}>
        <Text style={styles.appNameText}>MyUSC</Text>

        <VerticalSpace h={1} />

        <Text style={styles.versionAndCopyrightText}>Version 1.0.0</Text>

        <VerticalSpace h={2} />

        <Image source={images.LOGO} style={styles.logo} />

        <VerticalSpace h={2} />

        <Text style={styles.versionAndCopyrightText}>Copyright 2024 MyUSC</Text>
      </View>
    </View>
  );
};

export default AppInfoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appNameText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.6,
    color: THEME,
  },
  versionAndCopyrightText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  logo: {
    height: sR * 12,
    width: sR * 12,
    alignSelf: "center",
  },
});

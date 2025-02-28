import React, { useState, useCallback } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import VerticalSpace from "../../components/VerticalSpace";
import LanguageCard from "../../components/Cards/LanguageCard";
import SolidButton from "../../components/Button/SolidButton";

import { WHITE } from "../../constants/colors";
import images from "../../constants/images";
import { sR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";
import i18n from "../../localization/i18n";

const SelectLanguageScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ur">("en");

  const handleSelectLanguage = useCallback((language: "en" | "ur") => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  const goToRegister = useCallback(() => {
    navigation.navigate("Register");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={images.LOGO} style={styles.logo} />
    
      <VerticalSpace h={6} />

      <LanguageCard
        language="en"
        selectedLanguage={selectedLanguage}
        onPress={() => handleSelectLanguage("en")}
      />

      <VerticalSpace h={2} />

      <LanguageCard
        language="ur"
        selectedLanguage={selectedLanguage}
        onPress={() => handleSelectLanguage("ur")}
      />

      <VerticalSpace h={2} />

      <SolidButton label={t(`SELECT_LANGUAGE.NEXT`)} size="xl" onPress={goToRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: sR * 10,
    width: sR * 10,
  },
});

export default SelectLanguageScreen;

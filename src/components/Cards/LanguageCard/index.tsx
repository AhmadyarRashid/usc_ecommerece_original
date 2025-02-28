import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import VerticalSpace from "../../VerticalSpace";

import { sR, wR } from "../../../constants/dimensions";
import {
  BLACK,
  HEAVY_SUGAR,
  THEME,
  WHITE_SMOKE,
} from "../../../constants/colors";
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import { LANGUAGE } from "../../../constants/enum";

interface LanguageCardProps {
  language: "en" | "ur";
  selectedLanguage: string;
  onPress: () => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  language,
  selectedLanguage,
  onPress,
}) => {
  const langData = LANGUAGE[language];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor:
            selectedLanguage === language ? HEAVY_SUGAR : WHITE_SMOKE,
          borderColor: selectedLanguage === language ? THEME : WHITE_SMOKE,
        },
      ]}
    >
      <Text style={[styles.greetingText, styles.align(language)]}>
        {langData.greeting}
      </Text>
      <Text style={[styles.inquiryText, styles.align(language)]}>
        {langData.inquiry}
      </Text>

      <VerticalSpace h={2} />

      <Text style={[styles.languageText, styles.align(language, true)]}>
        {langData.languageText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wR * 92,
    borderRadius: sR,
    padding: sR * 2,
    borderWidth: 2,
  },
  greetingText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  inquiryText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  languageText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  align: (language: string, isOpposite = false) => ({
    alignSelf:
      language === "ur"
        ? isOpposite
          ? "flex-start"
          : "flex-end"
        : isOpposite
        ? "flex-end"
        : "flex-start",
  }),
});

export default LanguageCard;

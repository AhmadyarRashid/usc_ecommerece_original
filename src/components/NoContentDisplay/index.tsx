import React from "react";
import { View, Text, StyleSheet } from "react-native";

import LottieAnimation from "../LottieAnimation";
import SolidButton from "../Button/SolidButton";
import VerticalSpace from "../VerticalSpace";

import { PROXIMA_NOVA_BOLD, PROXIMA_NOVA_REGULAR } from "../../constants/fonts";
import { sR } from "../../constants/dimensions";
import { BLACK } from "../../constants/colors";
import { EMPTY_BOX } from "../../constants/animations";

type NoContentDisplayProps = {
  label?: string;
  info?: string;
  displayActionButton?: boolean;
  actionButtonText: string;
  onActionButtonPress: () => void;
};

const NoContentDisplay: React.FC<NoContentDisplayProps> = ({
  label,
  info,
  displayActionButton,
  actionButtonText,
  onActionButtonPress,
}) => {
  return (
    <View style={styles.rootContainer}>
      <LottieAnimation source={EMPTY_BOX} customStyle={styles.lottieStyle} />

      <VerticalSpace h={2} />

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.info}>{info}</Text>

      <VerticalSpace h={2} />

      {displayActionButton && (
        <SolidButton
          label={actionButtonText}
          size="xl"
          onPress={onActionButtonPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
  },
  lottieStyle: {
    height: sR * 12,
    width: sR * 12,
  },
  label: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.4,
    textAlign: "center",
  },
  info: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    textAlign: "center",
    color: BLACK,
    opacity: 0.6,
  },
});

export default NoContentDisplay;

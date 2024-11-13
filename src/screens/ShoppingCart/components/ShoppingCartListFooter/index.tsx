import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import VerticalSpace from "../../../../components/VerticalSpace";
import SolidButton from "../../../../components/Button/SolidButton";

import { THEME, WHITE_SMOKE } from "../../../../constants/colors";
import { hR, sR, wR } from "../../../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../../constants/fonts";

const ShoppingCartListFooter: React.FC = () => {
  return (
    <View>
      <VerticalSpace h={2} />
      <View style={styles.secondaryInfoContainer}>
        <Text style={styles.secondaryInfoText}>
          Enjoy a reduced delivery fee of PKR 100, down from PKR 200!
        </Text>
      </View>
      <VerticalSpace h={2} />
      <SolidButton label="Proceed to Checkout" size="xl" />
    </View>
  );
};

export default ShoppingCartListFooter;

const styles = StyleSheet.create({
  secondaryInfoContainer: {
    borderRadius: sR,
    backgroundColor: WHITE_SMOKE,
    flexDirection: "row",
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    alignItems: "center",
  } as ViewStyle,
  secondaryInfoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: THEME,
    fontSize: sR * 1.2,
  } as TextStyle,
});

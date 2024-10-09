import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AddCircle, MinusCirlce } from "iconsax-react-native";

import HorizontalSpace from "../../../../components/HorizontalSpace";
import SolidButton from "../../../../components/Button/SolidButton";

import { hR, sR, width, wR } from "../../../../constants/dimensions";
import {
  HEAVY_SUGAR,
  JASPER_CANE,
  THEME,
  WHITE,
} from "../../../../constants/colors";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../../constants/fonts";

interface CartControlsProps {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleAddToCart: () => void;
}

const CartControls: React.FC<CartControlsProps> = ({
  count,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.incDecContainer}>
        <TouchableOpacity onPress={handleDecrement}>
          <MinusCirlce size={sR * 2.4} color={THEME} />
        </TouchableOpacity>
        <HorizontalSpace w={4} />
        <Text style={styles.productCountText}>{count}</Text>
        <HorizontalSpace w={4} />
        <TouchableOpacity onPress={handleIncrement}>
          <AddCircle size={sR * 2.4} color={THEME} />
        </TouchableOpacity>
      </View>
      <SolidButton label="Add to cart" size="md" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width,
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: JASPER_CANE,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    backgroundColor: WHITE,
  },
  incDecContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: HEAVY_SUGAR,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    borderRadius: 220,
  },
  productCountText: {
    fontSize: sR * 1.3,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
});

export default CartControls;

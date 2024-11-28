import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Trash } from "iconsax-react-native";

import HorizontalSpace from "../../HorizontalSpace";
import VerticalSpace from "../../VerticalSpace";

import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import {
  BLACK,
  FLINT_STONE,
  PINBALL,
  THEME,
  WHITE_SMOKE,
} from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import images from "../../../constants/images";

interface CartItemCardProps {
  data: {
    name: string;
    list_price: number;
    count: number;
  };
  onRemoveItemPress: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  data: { name, list_price, count },
  onRemoveItemPress,
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.productImageContainer}>
          <Image
            source={images.SHAMPOO}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <HorizontalSpace w={2} />
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.productNameText} numberOfLines={2}>
            {name}
          </Text>
          <VerticalSpace h={0.6} />
          <View style={styles.productCostContainer}>
            <Text style={styles.discountedPriceText}>{list_price}</Text>
            <HorizontalSpace w={2} />
            <Text style={styles.originalPriceText}>{list_price}</Text>
          </View>
          <VerticalSpace h={0.6} />
          <Text style={styles.qtyText}>{count}x Items</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onRemoveItemPress}>
        <Trash size={sR * 1.4} color={THEME} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderColor: PINBALL,
    borderRadius: sR,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    width: wR * 92,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: hR * 2,
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
  },
  productImageContainer: {
    backgroundColor: WHITE_SMOKE,
    alignItems: "center",
    padding: sR,
    borderRadius: sR,
  },
  productImage: {
    height: sR * 4,
    width: sR * 4,
  },
  productNameText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  productCostContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: THEME,
  },
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: "line-through",
  },
  qtyText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

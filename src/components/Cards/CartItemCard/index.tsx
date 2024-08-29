import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
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
    discountedPrice: string;
    originalPrice: string;
    quantity: string;
  };
  onPress: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ data, onPress }) => {
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

        <View>
          <Text style={styles.productNameText}>{data.name}</Text>

          <VerticalSpace h={0.6} />

          <View style={styles.productCostContainer}>
            <Text style={styles.discountedPriceText}>
              {data.discountedPrice}
            </Text>

            <HorizontalSpace w={2} />

            <Text style={styles.originalPriceText}>{data.originalPrice}</Text>
          </View>

          <VerticalSpace h={0.6} />

          <Text style={styles.qtyText}>{data.quantity}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress}>
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
    width:wR*92,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom:hR*2
  } as ViewStyle,
  leftContainer: { flexDirection: "row" } as ViewStyle,
  productImageContainer: {
    backgroundColor: WHITE_SMOKE,
    alignItems: "center",
    padding: sR,
    borderRadius: sR,
  } as ViewStyle,
  productImage: {
    height: sR * 4,
    width: sR * 4,
  } as ImageStyle,
  productNameText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: BLACK,
  } as TextStyle,
  productCostContainer: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: THEME,
  } as TextStyle,
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: "line-through",
  } as TextStyle,
  qtyText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  } as TextStyle,
});

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { AddCircle } from "iconsax-react-native";

import VerticalSpace from "../../VerticalSpace";

import images from "../../../constants/images";
import { hR, sR, wR } from "../../../constants/dimensions";
import { BLACK, PINBALL, THEME, WHITE, WHITE_SMOKE } from "../../../constants/colors";
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";

interface ProductData {
  name: string;
  list_price: string;
}

interface ProductsCardProps {
  data: ProductData;
  onPress?: () => void;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={onPress}>
      <View style={styles.productImageContainer}>
        <Image
          source={images.SHAMPOO as ImageSourcePropType}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <VerticalSpace h={1} />

      <View style={{ height: sR * 4 }}>
        <Text style={styles.labelText} numberOfLines={2}>
          {data.name.replace(/\(Wrong Code\)\s*/g, "")}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.priceText}>PKR {data.list_price}</Text>

        <TouchableOpacity>
          <AddCircle size={sR * 2.6} color={THEME} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: wR * 36,
    marginRight: wR * 4,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  } as ViewStyle,
  productImageContainer: {
    backgroundColor: WHITE_SMOKE,
    alignItems: "center",
    paddingVertical: hR * 2,
    borderRadius: sR,
  } as ViewStyle,
  productImage: {
    height: sR * 8,
    width: sR * 8,
  } as ImageStyle,
  labelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
    opacity: 0.6,
  } as TextStyle,
  priceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  } as TextStyle,
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
});

export default ProductsCard;

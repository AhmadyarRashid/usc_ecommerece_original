import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

import { hR, sR, wR } from "../../../constants/dimensions";
import { BLACK, FLINT_STONE, THEME, WHITE_SMOKE } from "../../../constants/colors";
import images from "../../../constants/images";
import { Image } from "react-native";
import HorizontalSpace from "../../HorizontalSpace";
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import VerticalSpace from "../../VerticalSpace";

interface ProductsSecondaryCardData {
  data: {};
  onItemPress: () => void;
}

const ProductsSecondaryCard: React.FC<ProductsSecondaryCardData> = ({
  data,
  onItemPress,
}) => {
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={onItemPress}>
      <Image
        source={images.SHAMPOO as ImageSourcePropType}
        style={styles.productImage}
        resizeMode="contain"
      />

      <HorizontalSpace w={2} />

      <View style={{ flex: 1 }}>
        <Text style={styles.productNameText}>{data?.name}</Text>

        <Text style={styles.productStockStatusText}>
          {data?.qty_available !== 0 ? `In Stock` : `Out of Stock`}
        </Text>

        <VerticalSpace h={1} />

        <Text style={styles.productPriceText}>PKR {data?.list_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductsSecondaryCard;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    borderRadius: sR,
    width: wR * 92,
    marginBottom: hR * 2,
    backgroundColor: WHITE_SMOKE,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    height: sR * 6,
    width: sR * 6,
  },
  productNameText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color:BLACK
  },
  productStockStatusText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR,
    color: THEME,
  },
  productPriceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

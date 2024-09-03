import React, { useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import HorizontalSpace from "../../components/HorizontalSpace";
import HorizontalLine from "../../components/HorizontalLine";
import CartControls from "./component/CartControls";

import { BLACK, FLINT_STONE, HULK, WHITE } from "../../constants/colors";
import images from "../../constants/images";
import { hR, sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Product Details" onPress={goBack} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.childContainer}>
          <VerticalSpace h={2} />

          <Image source={images.COFFEE} style={styles.productImage} />

          <VerticalSpace h={2} />

          <Text style={styles.productLabelText}>
            Stock Cold Brew Original Coffee Pack 200g Special Edition | Multi
            Flavors
          </Text>

          <VerticalSpace h={2} />

          <View style={styles.priceAndAvailabilityContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.discountedPriceText}>PKR 200</Text>

              <HorizontalSpace w={2} />

              <Text style={styles.originalPriceText}>PKR 300</Text>
            </View>

            <Text style={styles.productAvailabilityText}>
              Available in Stock
            </Text>
          </View>

          <VerticalSpace h={2} />

          <HorizontalLine />

          <VerticalSpace h={2} />

          <Text style={styles.productInfoHeadingText}>Product Information</Text>

          <VerticalSpace h={2} />

          <Text style={styles.productInfoText}>
            Darkly colored, bitter, and slightly acidic, coffee has a
            stimulating effect on humans, primarily due to its caffeine content.
            It has the highest sales in the world market for hot drinks. The
            seeds of the Coffea plant's fruits are separated to produce
            unroasted green coffee beans.
          </Text>
        </View>
      </ScrollView>

      <CartControls />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  } as ViewStyle,
  childContainer: {
    paddingHorizontal: wR * 4,
    paddingBottom: hR * 12,
  } as ViewStyle,
  productImage: {
    width: wR * 92,
    height: hR * 24,
    alignSelf: "center",
    resizeMode: "cover",
  } as ImageStyle,
  productLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  } as TextStyle,
  priceAndAvailabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.6,
    color: BLACK,
  } as TextStyle,
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: "line-through",
  } as TextStyle,
  productAvailabilityText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: HULK,
  } as TextStyle,
  productInfoHeadingText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  } as TextStyle,
  productInfoText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  } as TextStyle,
});

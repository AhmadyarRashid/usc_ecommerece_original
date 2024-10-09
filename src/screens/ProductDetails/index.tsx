import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

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
import {
  AppNavigationProps,
  StackParamList,
} from "../../constants/navigationTypes";
import { RootState } from "../../redux/store";
import { setCartFields } from "../../redux/slices/cart";
import { displayToast } from "../../constants/functions";
import { createDynamicSelector } from "../../redux/selectors";

type ProductDetailsRouteProp = RouteProp<StackParamList, "ProductDetails">;

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute<ProductDetailsRouteProp>();
  const selectAuthAddressOrder = createDynamicSelector([
    "product",
    "cart",
  ] as const);
  const { product, cart } = useSelector((state: RootState) => selectAuthAddressOrder(state));
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  const productByID = product?.productList.find(item => item.id === route.params.productID);

  const addToCart = () => {
    if (!productByID) {
      displayToast({
        type: "error",
        text1: "Error",
        text2: `Product not found!`,
      });
      return;
    }
  
    const existingItem = cart.cartList.find(item => item.id === productByID.id);
    const newCount = existingItem ? existingItem.count + count : count;
  
    if (newCount > productByID.qty_available) {
      displayToast({
        type: "error",
        text1: "Error",
        text2: `Cannot add more than available quantity!`,
      });
      return;
    }
  
    const updatedCartList = existingItem
      ? cart.cartList.map(item =>
          item.id === productByID.id ? { ...item, count: newCount } : item
        )
      : [...cart.cartList, { ...productByID, count }];
  
    dispatch(setCartFields({ cartList: updatedCartList }));
  
    displayToast({
      type: "success",
      text1: "Success",
      text2: existingItem ? `Item count updated in your cart!` : `Item successfully added to your cart!`,
    });
  };
  

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!productByID) {
    return (
      <View style={styles.rootContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Product Details" onPress={goBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.childContainer}>
          <VerticalSpace h={2} />
          <Image
            source={
              productByID.image_128
                ? { uri: productByID.image_128 }
                : images.COFFEE
            }
            style={styles.productImage}
          />
          <VerticalSpace h={2} />
          <Text style={styles.productLabelText}>{productByID.name}</Text>
          <VerticalSpace h={2} />
          <View style={styles.priceAndAvailabilityContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.discountedPriceText}>
                PKR {productByID.list_price}
              </Text>
              <HorizontalSpace w={2} />
              <Text style={styles.originalPriceText}>PKR 300</Text>
            </View>
            <Text style={styles.productAvailabilityText}>
              {productByID.qty_available > 0
                ? "Available in Stock"
                : "Out of Stock"}
            </Text>
          </View>
          <VerticalSpace h={2} />
          <HorizontalLine />
          <VerticalSpace h={2} />
          <Text style={styles.productInfoHeadingText}>Product Information</Text>
          <VerticalSpace h={2} />
          <Text style={styles.productInfoText}>N/A</Text>
        </View>
      </ScrollView>
      <CartControls
        count={count}
        handleIncrement={() => setCount(prev => prev + 1)}
        handleDecrement={() => setCount(prev => Math.max(prev - 1, 1))}
        handleAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  childContainer: {
    paddingHorizontal: wR * 4,
    paddingBottom: hR * 12,
  },
  productImage: {
    width: wR * 92,
    height: hR * 24,
    alignSelf: "center",
    resizeMode: "cover",
  },
  productLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  priceAndAvailabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.6,
    color: BLACK,
  },
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: "line-through",
  },
  productAvailabilityText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: HULK,
  },
  productInfoHeadingText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  productInfoText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

export default ProductDetailsScreen;

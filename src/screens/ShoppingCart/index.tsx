import React, { useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import CartItemCard from "../../components/Cards/CartItemCard";
import SolidButton from "../../components/Button/SolidButton";

import {
  AMBROSIA_IVORY,
  BLACK,
  BUCKTHORN_BROWN,
  SAND_MUFFIN,
  THEME,
  WHITE,
  WHITE_SMOKE,
} from "../../constants/colors";
import { hR, sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";

interface CartItem {
  name: string;
  discountedPrice: string;
  originalPrice: string;
  quantity: string;
}

const CART_DATA: CartItem[] = [
  {
    name: "Onion Desi 2kg",
    discountedPrice: "PKR 100",
    originalPrice: "PKR 200",
    quantity: "5x Items",
  },
  {
    name: "White Sugar",
    discountedPrice: "PKR 500",
    originalPrice: "PKR 800",
    quantity: "10x Items",
  },
  {
    name: "Shampoo 100mg",
    discountedPrice: "PKR 100",
    originalPrice: "PKR 200",
    quantity: "5x Items",
  },
];

const ShoppingCartScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Shopping Bag" onPress={goBack}/>

      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <VerticalSpace h={2} />

        <View style={styles.primaryInfoContainer}>
          <Text style={styles.primaryInfoText}>
            Discounts have been automatically applied to all of your shopping
            items. Enjoy your savings on every purchase!
          </Text>
        </View>

        <VerticalSpace h={2} />

        <Text style={styles.headingText}>My Orders</Text>

        <VerticalSpace h={2} />

        <FlatList
          data={CART_DATA}
          renderItem={({ item }) => (
            <CartItemCard data={item} onPress={() => console.log()} />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <View style={styles.secondaryInfoContainer}>
          <Text style={styles.secondaryInfoText}>
            Enjoy a reduced delivery fee of PKR 100, down from PKR 200!
          </Text>
        </View>

        <VerticalSpace h={2} />

        <SolidButton label="Proceed to Checkout" size="xl" />
      </ScrollView>
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: WHITE,
    flex: 1,
  } as ViewStyle,
  scrollViewContentContainer: {
    paddingHorizontal: wR * 4,
  },
  primaryInfoContainer: {
    borderWidth: 1,
    borderColor: SAND_MUFFIN,
    borderRadius: sR,
    backgroundColor: AMBROSIA_IVORY,
    flexDirection: "row",
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    alignItems: "center",
  } as ViewStyle,
  primaryInfoText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: BUCKTHORN_BROWN,
    fontSize: sR * 1.2,
  } as TextStyle,
  headingText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.4,
  } as TextStyle,
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

import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import HeaderSecondary from "../../components/Header/HeaderSecondary";
import SearchBox from "../../components/SearchBox";
import SectionTitleWithAction from "./components/SectionTitleWithAction";
import CategoriesCard from "../../components/Cards/CategoriesCard";
import ProductsCard from "../../components/Cards/ProductsCard";
import VerticalSpace from "../../components/VerticalSpace";

import {
  AMBROSIA_IVORY,
  HEAVY_SUGAR,
  PERFUME_HAZE,
  POUTY_PURPLE,
  SAND_MUFFIN,
  SNARKY_MINT,
  WHITE,
} from "../../constants/colors";
import { hR, wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";

const CATEGORIES_DATA = [
  {
    label: "Fruits\n& Vegetables",
    category: "Fruits & Veg items",
    borderColor: SNARKY_MINT,
    bgColor: HEAVY_SUGAR,
  },
  {
    label: "Home\n& Cleaning",
    category: "Cleaning Product",
    borderColor: SAND_MUFFIN,
    bgColor: AMBROSIA_IVORY,
  },
  {
    label: "Stationary\n& Office",
    category: "Stationary Product",
    borderColor: POUTY_PURPLE,
    bgColor: PERFUME_HAZE,
  },
];

const PRODUCTS_DATA = [
  {
    label: "Dishwashing Liquid Pro 220ml",
    price: "PKR 200",
  },
  {
    label: "Doctor Toothpaste",
    price: "PKR 150",
  },
  {
    label: "Kolson Macaroni 500mg",
    price: "PKR 350",
  },
  {
    label: "Banaspati Oil 5kg",
    price: "PKR 150",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const tabBarHeight = useBottomTabBarHeight();

  const goToShoppingCart = useCallback(() => {
    navigation.navigate("ShoppingCart");
  }, [navigation]);

  const goToProductDetails = useCallback(() => {
    navigation.navigate("ProductDetails");
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderSecondary
        onLeftPress={() => alert("location screen in-progress")}
        onRightPress={goToShoppingCart}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        <SearchBox placeholder={`Search anything you want`} />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title={`Explore Categories`} />

        <VerticalSpace h={2} />

        <FlatList
          data={CATEGORIES_DATA}
          renderItem={({ item }) => <CategoriesCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title={`Fresh Sale`} />

        <VerticalSpace h={2} />

        <FlatList
          data={PRODUCTS_DATA}
          renderItem={({ item }) => (
            <ProductsCard data={item} onPress={goToProductDetails} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title={`Frequently Ordered`} />

        <VerticalSpace h={2} />

        <FlatList
          data={PRODUCTS_DATA}
          renderItem={({ item }) => (
            <ProductsCard data={item} onPress={goToProductDetails} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <View style={{ height: tabBarHeight }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: { backgroundColor: WHITE, flex: 1 },
  scrollViewContainer: { paddingHorizontal: wR * 4 },
});

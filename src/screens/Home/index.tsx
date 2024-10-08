import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ListRenderItem,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AxiosRequestHeaders } from "axios";
import { useDispatch, useSelector } from "react-redux";

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
import { wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";
import useApiHook from "../../hooks/rest/useApi";
import { setProductFields } from "../../redux/slices/product";
import { RootState } from "../../redux/store";
import { setCategoryFields } from "../../redux/slices/category";

// Type for Category Data
interface CategoryData {
  label: string;
  category: string;
  borderColor: string;
  bgColor: string;
}

interface ProductData {
  id: number;
  name: string;
  list_price: number;
  qty_available: number;
  categ_id: [number, string];
  image_128: boolean | null;
}

const CATEGORIES_DATA: CategoryData[] = [
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

const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const tabBarHeight = useBottomTabBarHeight();
  const { handleRestApi, restApiLoading } = useApiHook();
  const products = useSelector((state: RootState) => state.product.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const getAllProducts = async () => {
    const response = await handleRestApi({
      method: "post",
      url: "product_get",
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.data) {
      dispatch(setProductFields({ productList: response.data.result.data }));
    }
  };

  const getAllCategories = async () => {
    const response = await handleRestApi({
      method: "post",
      url: "product_categories_get",
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.data) {
      dispatch(setCategoryFields({ categoryList: response.data.result.data }));
    }
  };

  const goToShoppingCart = useCallback(() => {
    navigation.navigate("ShoppingCart");
  }, [navigation]);

  const goToProductDetails = useCallback(
    (productID: string) => {
      navigation.navigate("ProductDetails", { productID });
    },
    [navigation]
  );

  const goToDeliveryAddress = useCallback(() => {
    navigation.navigate("DeliveryAddress");
  }, [navigation]);

  // Render method for Categories
  const renderCategory: ListRenderItem<CategoryData> = ({ item }) => (
    <CategoriesCard data={item} />
  );

  const renderProduct: ListRenderItem<ProductData> = ({ item }) => (
    <ProductsCard data={item} onPress={() => goToProductDetails(item.id)} />
  );

  return (
    <View style={styles.rootContainer}>
      <HeaderSecondary
        onLeftPress={goToDeliveryAddress}
        onRightPress={goToShoppingCart}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        <SearchBox placeholder="Search anything you want" />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title="Explore Categories" />

        <VerticalSpace h={2} />

        <FlatList
          data={CATEGORIES_DATA}
          renderItem={renderCategory}
          keyExtractor={(item) => item.category}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title="Fresh Sale" />

        <VerticalSpace h={2} />

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <SectionTitleWithAction title="Frequently Ordered" />

        <VerticalSpace h={2} />

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
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

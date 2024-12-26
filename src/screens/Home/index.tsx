import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ListRenderItem,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AxiosRequestHeaders } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import HeaderSecondary from "../../components/Header/HeaderSecondary";
import SearchBox from "../../components/SearchBox";
import SectionTitleWithAction from "./components/SectionTitleWithAction";
import CategoriesCard from "../../components/Cards/CategoriesCard";
import ProductsCard from "../../components/Cards/ProductsCard";
import VerticalSpace from "../../components/VerticalSpace";
import Loader from "../../components/Loader";
import SearchButton from "./components/SearchButton";

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
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import { setAddressFields } from "../../redux/slices/address";
import { setCartFields } from "../../redux/slices/cart";
import { displayToast } from "../../constants/functions";

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
  const { address, cart, product } = useDynamicSliceSelector([
    "address",
    "cart",
    "product",
  ]);
  const isFocused = useIsFocused();

  const [count, setCount] = useState(1);

  useEffect(() => {
    // if(isFocused && isEmpty(address?.addressList)){
    //   goToDeliveryAddress()
    // }
  }, [isFocused]);

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

  const clearSelectedAddress = () => {
    dispatch(setAddressFields({ selectedAddress: null }));
  };

  const addToCart = (productToAdd) => {
    const existingItem = cart.cartList.find(
      (item) => item.id === productToAdd.id
    );

    const newCount = existingItem ? existingItem.count + count : count;

    // if (newCount > productToAdd.qty_available) {
    //   displayToast({
    //     type: "error",
    //     text1: "Error",
    //     text2: `Cannot add more than available quantity!`,
    //   });
    //   return;
    // }

    const updatedCartList = existingItem
      ? cart.cartList.map((item) =>
          item.id === productToAdd.id ? { ...item, count: newCount } : item
        )
      : [...cart.cartList, { ...productToAdd, count }];

    dispatch(setCartFields({ cartList: updatedCartList }));

    displayToast({
      type: "success",
      text1: "Success",
      text2: existingItem
        ? `Item count updated in your cart!`
        : `Item successfully added to your cart!`,
    });
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

  const goToViewAllProducts = useCallback(() => {
    navigation.navigate("ViewAllProducts");
  }, [navigation]);

  const goToSearchProducts = useCallback(() => {
    navigation.navigate("SearchProducts");
  }, [navigation]);

  const goToDeliveryAddress = useCallback(() => {
    navigation.navigate("Address");
  }, [navigation]);

  // Render method for Categories
  const renderCategory: ListRenderItem<CategoryData> = ({ item }) => (
    <CategoriesCard data={item} />
  );

  const renderProduct: ListRenderItem<ProductData> = ({ item }) => (
    <ProductsCard
      data={item}
      onPress={() => goToProductDetails(item.id)}
      onAddToCartPress={() => addToCart(item)}
    />
  );

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderSecondary
        onLeftPress={goToDeliveryAddress}
        onRightPress={() => {
          // clearSelectedAddress();
          goToShoppingCart();
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        {/* <SearchBox placeholder="Search anything you want" /> */}

        <SearchButton onSearchButtonPress={goToSearchProducts} />

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

        <SectionTitleWithAction
          title="Fresh Sale"
          onViewAllPress={goToViewAllProducts}
        />

        <VerticalSpace h={2} />

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />

        <SectionTitleWithAction
          title="Frequently Ordered"
          onViewAllPress={goToViewAllProducts}
        />

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

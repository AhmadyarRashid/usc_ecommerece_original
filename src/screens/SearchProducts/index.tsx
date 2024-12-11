import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AxiosRequestHeaders } from "axios";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import SearchBox from "../../components/SearchBox";
import LottieAnimation from "../../components/LottieAnimation";
import ProductsSecondaryCard from "../../components/Cards/ProductsSecondaryCard";

import { BLACK, WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { sR, wR } from "../../constants/dimensions";
import { SEARCH_PRODUCTS } from "../../constants/animations";
import { PROXIMA_NOVA_REGULAR } from "../../constants/fonts";

import useApiHook from "../../hooks/rest/useApi";
import { setProductFields } from "../../redux/slices/product";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";

const SearchProductsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { handleRestApi, restApiLoading } = useApiHook();
  const dispatch = useDispatch();
  const { product } = useDynamicSliceSelector(["product"]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(setProductFields({ searchedProductList: [] }));
    }
  }, [isFocused]);

  const handleProductsSearch = useCallback(
    async (value: string) => {
      if (value.trim() === "") {
        dispatch(setProductFields({ searchedProductList: [] }));
        return;
      }

      const response = await handleRestApi({
        method: "post",
        url: "product_get",
        headers: { Authorization: "none" } as AxiosRequestHeaders,
        data: { name: value },
      });

      if (response?.data?.result?.data) {
        dispatch(
          setProductFields({ searchedProductList: response.data.result.data })
        );
      }
    },
    [dispatch, handleRestApi]
  );

  const goToProductDetails = useCallback(
    (productID: string) => {
      navigation.navigate("ProductDetails", { productID, arrayToSearch:`searchedProductList` });
    },
    [navigation]
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Search Products" onPress={goBack} />

      <View style={styles.secondaryContainer}>
        <VerticalSpace h={2} />

        <SearchBox
          placeholder="Search anything you want..."
          onChangeText={handleProductsSearch}
        />

        <VerticalSpace h={2} />

        {product?.searchedProductList?.length === 0 && !restApiLoading && (
          <View style={styles.emptyStateContainer}>
            <LottieAnimation
              source={SEARCH_PRODUCTS}
              customStyle={styles.searchProductAnimation}
              loop={true}
            />
            <Text style={styles.quicklySearchProductsText}>
              Quickly search for products in your inventory with ease. Enter
              keywords or filters to locate the items you need in no time.
            </Text>
          </View>
        )}

        <FlatList
          data={product?.searchedProductList || []}
          renderItem={({ item }) => (
            <ProductsSecondaryCard
              data={item}
              onItemPress={() => goToProductDetails(item.id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Replace with a unique key from item if available
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SearchProductsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  secondaryContainer: {
    paddingHorizontal: wR * 4,
    flex: 1,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchProductAnimation: {
    height: sR * 18,
    width: sR * 18,
  },
  quicklySearchProductsText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    textAlign: "center",
    fontSize: sR * 1.3,
    color: BLACK,
    opacity: 0.6,
  },
});

import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import ProductsSecondaryCard from "../../components/Cards/ProductsSecondaryCard";

import { WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import {  wR } from "../../constants/dimensions";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";

const ViewAllProductsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { product } = useDynamicSliceSelector(["product"]);

  const goToProductDetails = useCallback(
    (productID: string) => {
      navigation.navigate("ProductDetails", { productID });
    },
    [navigation]
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="All Products" onPress={goBack} />

      <View style={styles.secondaryContainer}>
        <VerticalSpace h={2} />

        <FlatList
          data={product?.productList || []}
          renderItem={({ item }) => (
            <ProductsSecondaryCard
              data={item}
              onItemPress={() => goToProductDetails(item.id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ViewAllProductsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  secondaryContainer: {
    paddingHorizontal: wR * 4,
    flex: 1,
  },
});

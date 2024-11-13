import React, { useCallback } from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import CartItemCard from "../../components/Cards/CartItemCard";
import ShoppingCartListHeader from "./components/ShoppingCartListHeader";
import ShoppingCartListFooter from "./components/ShoppingCartListFooter";
import NoContentDisplay from "../../components/NoContentDisplay";

import { WHITE } from "../../constants/colors";
import { wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { createDynamicSelector } from "../../redux/selectors";
import { RootState } from "../../redux/store";
import { setCartFields } from "../../redux/slices/cart";
import { displayToast } from "../../constants/functions";

const ShoppingCartScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const selectAuthAddressOrder = createDynamicSelector(["cart"] as const);
  const { cart } = useSelector((state: RootState) =>
    selectAuthAddressOrder(state)
  );
  const dispatch = useDispatch();

  const handleRemoveCartItem = (id: number) => {
    dispatch(setCartFields({ cartList: cart?.cartList.filter(item => item.id !== id) }));
    
    displayToast({
      type: "success",
      text1: "Success",
      text2: `Item successfully removed from your cart!`,
    });
  };
  

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Shopping Bag" onPress={goBack} />

      {isEmpty(cart?.cartList) ? (
        <View style={styles.noContentDisplayContainer}>
          <NoContentDisplay
            label="No Items Yet"
            info="Oops! Your cart is empty. Browse our collection to start shopping!"
            displayActionButton={false}
          />
        </View>
      ) : (
        <FlatList
          data={cart?.cartList}
          renderItem={({ item }) => (
            <CartItemCard data={item} onRemoveItemPress={()=>handleRemoveCartItem(item.id)} />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ShoppingCartListHeader />}
          ListFooterComponent={<ShoppingCartListFooter />}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: WHITE,
    flex: 1,
  } as ViewStyle,
  flatListContentContainer: {
    paddingHorizontal: wR * 4,
  },
  noContentDisplayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useCallback } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import CartItemCard from "../../components/Cards/CartItemCard";
import ShoppingCartListHeader from "./components/ShoppingCartListHeader";
import ShoppingCartListFooter from "./components/ShoppingCartListFooter";
import NoContentDisplay from "../../components/NoContentDisplay";
import AddressSelectionModal from "../../components/Modals/AddressSelectionModal";
import Loader from "../../components/Loader";

import { WHITE } from "../../constants/colors";
import { wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { setCartFields } from "../../redux/slices/cart";
import { displayToast } from "../../constants/functions";
import useToggle from "../../hooks/useToggle";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import useApiHook from "../../hooks/rest/useApi";

const ShoppingCartScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { cart, address, auth } = useDynamicSliceSelector([
    "cart",
    "address",
    "auth",
  ]);
  const dispatch = useDispatch();
  const [locationModal, toggleLocationModal] = useToggle(false);
  const { handleRestApi, restApiLoading } = useApiHook();
  const { t } = useTranslation();

  const handleRemoveCartItem = (id: number) => {
    dispatch(
      setCartFields({
        cartList: cart?.cartList.filter((item) => item.id !== id),
      })
    );

    displayToast({
      type: "success",
      text1: "Success",
      text2: `Item successfully removed from your cart!`,
    });
  };

  const handlePlaceOrder = async () => {
    const data = {
      auth_token: auth?.accessToken,
      login: auth?.userName,
      product_list: cart?.cartList.map((item) => ({
        ptid: item?.id,
        quantity: item?.count,
      })),
      delivery_address_id: address?.selectedAddress?.id,
    };

    const response = await handleRestApi({
      method: "post",
      url: "order_create",
      data,
    });

    if (response?.data?.result?.status === 200) {
      dispatch(setCartFields({ cartList: [] }));

      displayToast({
        type: "success",
        text1: "Success",
        text2: `Order confirmed! Thank you for shopping with us`,
      });

      goBack();
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {
        restApiLoading && <Loader />
      }

      <AddressSelectionModal
        isVisible={locationModal}
        onClose={toggleLocationModal}
      />

      <HeaderPrimary label={t(`SHOPPING_CART.SHOPPING_CART`)} onPress={goBack} />

      {isEmpty(cart?.cartList) ? (
        <View style={styles.noContentDisplayContainer}>
          <NoContentDisplay
            label={t(`SHOPPING_CART.NO_ITEMS_YET`)}
            info={t(`SHOPPING_CART.EMPTY_CART_MESSAGE`)}
            displayActionButton={false}
          />
        </View>
      ) : (
        <FlatList
          data={cart?.cartList}
          renderItem={({ item }) => (
            <CartItemCard
              data={item}
              onRemoveItemPress={() => handleRemoveCartItem(item.id)}
            />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <ShoppingCartListHeader onEditPress={toggleLocationModal} />
          }
          ListFooterComponent={
            <ShoppingCartListFooter
              onProceedCheckoutPress={toggleLocationModal}
              onPlaceOrderPress={handlePlaceOrder}
            />
          }
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
  },
  flatListContentContainer: {
    paddingHorizontal: wR * 4,
  },
  noContentDisplayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

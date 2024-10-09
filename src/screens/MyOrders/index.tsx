import React, { useCallback, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { AxiosRequestHeaders } from "axios";
import { useDispatch, useSelector } from "react-redux";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import OrdersCard from "../../components/Cards/OrdersCard";
import Loader from "../../components/Loader";

import { WHITE } from "../../constants/colors";
import VerticalSpace from "../../components/VerticalSpace";
import { wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";
import useApiHook from "../../hooks/rest/useApi";
import { RootState } from "../../redux/store";
import { setOrderFields } from "../../redux/slices/order";
import { createDynamicSelector } from "../../redux/selectors";

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const tabBarHeight = useBottomTabBarHeight();
  const { handleRestApi, restApiLoading } = useApiHook();
  const selectAuthAddressOrder = createDynamicSelector([
    "auth",
    "order",
  ] as const);
  const { auth, order } = useSelector((state: RootState) =>
    selectAuthAddressOrder(state)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
    };

    const response = await handleRestApi({
      method: "post",
      url: "order_view_all",
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response.data.result.status === 200) {
      dispatch(setOrderFields({ orderList: response.data.result.order_list }));
    }
  };

  const goToOrderDetails = useCallback(() => {
    navigation.navigate("OrderDetails");
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
      }}
    >
      {restApiLoading && <Loader />}
      <HeaderPrimary label={`My Orders`} onPress={goBack} />

      <VerticalSpace h={2} />

      <View style={{ paddingHorizontal: wR * 4, flex: 1 }}>
        <FlatList
          data={order?.orderList}
          renderItem={({ item }) => <OrdersCard onPress={goToOrderDetails} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
      </View>
    </View>
  );
};

export default MyOrdersScreen;

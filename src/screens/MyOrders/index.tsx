import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import OrdersCard from "../../components/Cards/OrdersCard";

import { WHITE } from "../../constants/colors";
import VerticalSpace from "../../components/VerticalSpace";
import { wR } from "../../constants/dimensions";
import { AppNavigationProps } from "../../constants/navigationTypes";

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const tabBarHeight = useBottomTabBarHeight();

  const goToOrderDetails = useCallback(() => {
    navigation.navigate("OrderDetails");
  }, [navigation]);

  const goBack = useCallback(()=>{
    navigation.goBack()
  },[navigation])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
      }}
    >
      <HeaderPrimary label={`My Orders`} onPress={goBack}/>

      <VerticalSpace h={2} />

      <View style={{ paddingHorizontal: wR * 4, flex: 1 }}>
        <FlatList
          data={[...Array(5)]}
          renderItem={({ item }) => <OrdersCard onPress={goToOrderDetails} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
      </View>
    </View>
  );
};

export default MyOrdersScreen;

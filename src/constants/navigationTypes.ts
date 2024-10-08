import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Register: undefined;
  VerifyPhone: undefined;
  AccountCreationSuccess: undefined;
  Home: undefined;
  ProductDetails: { productID: string };
  ShoppingCart: undefined;
  AppBottomTab: undefined;
  MyOrders: undefined;
  OrderDetails: undefined;
  DeliveryAddress: undefined;
  ConfirmAddress: undefined;
};

export type AppNavigationProps = NativeStackNavigationProp<StackParamList>;

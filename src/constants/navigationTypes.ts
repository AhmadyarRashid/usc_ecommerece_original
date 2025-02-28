import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Register: undefined;
  VerifyPhone: undefined;
  AccountCreationSuccess: undefined;
  Home: undefined;
  ProductDetails: { productID: number; arrayToSearch: string };
  ShoppingCart: undefined;
  AppBottomTab: undefined;
  MyOrders: undefined;
  OrderDetails: { orderID: number };
  DeliveryAddress: undefined;
  ConfirmAddress: { addressData: any };
  Address: undefined;
  Explore: undefined;
  Orders: undefined;
  MyComplaints: undefined;
  AppInfo: undefined;
  SearchProducts: undefined;
  ViewAllProducts: undefined;
  RegisterComplaint: undefined;
  SelectLanguage:undefined
};

export type AppNavigationProps = NativeStackNavigationProp<StackParamList>;

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home";
import ProductDetailsScreen from "../../screens/ProductDetails";
import ShoppingCartScreen from "../../screens/ShoppingCart";
import DeliveryAddressScreen from "../../screens/DeliveryAddress";
import ConfirmAddressScreen from "../../screens/ConfirmAddress";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
  useTabBarVisibility();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
      <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

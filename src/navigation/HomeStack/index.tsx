import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home";
import ProductDetailsScreen from "../../screens/ProductDetails";
import ShoppingCartScreen from "../../screens/ShoppingCart";
import SearchProductsScreen from "../../screens/SearchProducts";
import ViewAllProductsScreen from "../../screens/ViewAllProducts";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
  useTabBarVisibility();
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <Stack.Screen name="SearchProducts" component={SearchProductsScreen} />
      <Stack.Screen name="ViewAllProducts" component={ViewAllProductsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

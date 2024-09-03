import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyOrdersScreen from "../../screens/MyOrders";
import OrderDetailsScreen from "../../screens/OrderDetails";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";

const Stack = createNativeStackNavigator();

const OrdersStack: React.FC = () => {

  useTabBarVisibility()

  return (
    <Stack.Navigator
      initialRouteName="MyOrders"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
};

export default OrdersStack;

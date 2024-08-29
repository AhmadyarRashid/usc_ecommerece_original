import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MyOrders = ()=>{
  return null
}

const Stack = createNativeStackNavigator();

const OrdersStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShoppingCart"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen  name="MyOrders" component={MyOrders} />
    </Stack.Navigator>
  );
};

export default OrdersStack;

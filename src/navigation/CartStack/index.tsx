import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ShoppingCartScreen from '../../screens/ShoppingCart';

const Stack = createNativeStackNavigator();

const CartStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShoppingCart"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;

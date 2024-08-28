import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../../screens/Register";
import VerifyPhoneScreen from "../../screens/VerifyPhone";
import AccountCreationSuccessScreen from "../../screens/AccountCreationSuccess";
import HomeScreen from "../../screens/Home";
import ProductDetailsScreen from "../../screens/ProductDetails";
import ShoppingCartScreen from "../../screens/ShoppingCart";

const Stack = createNativeStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
      <Stack.Screen
        name="AccountCreationSuccess"
        component={AccountCreationSuccessScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;

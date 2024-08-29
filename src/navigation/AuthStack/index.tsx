import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../../screens/Register";
import VerifyPhoneScreen from "../../screens/VerifyPhone";
import AccountCreationSuccessScreen from "../../screens/AccountCreationSuccess";
import AppBottomTab from "../AppBottomTab";

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
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
      <Stack.Screen name="AppBottomTab" component={AppBottomTab} />
    </Stack.Navigator>
  );
};

export default AuthStack;

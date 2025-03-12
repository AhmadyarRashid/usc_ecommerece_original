import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveryAddressScreen from "../../screens/DeliveryAddress";
import ConfirmAddressScreen from "../../screens/ConfirmAddress";

const Stack = createNativeStackNavigator();

const AddressStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={"DeliveryAddress"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
      <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} />
    </Stack.Navigator>
  );
};

export default AddressStack;

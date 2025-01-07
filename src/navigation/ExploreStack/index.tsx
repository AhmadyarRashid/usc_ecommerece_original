import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreScreen from "../../screens/Explore";
import MyComplaintsScreen from "../../screens/MyComplaints";
import AppInfoScreen from "../../screens/AppInfo";
import RegisterComplaintScreen from "../../screens/RegisterComplaint";
import OrdersStack from "../OrdersStack";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";

const Stack = createNativeStackNavigator();

const ExlporeStack: React.FC = () => {
  
  useTabBarVisibility();

  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="MyComplaints" component={MyComplaintsScreen} />
      <Stack.Screen name="AppInfo" component={AppInfoScreen} />
      <Stack.Screen
        name="RegisterComplaint"
        component={RegisterComplaintScreen}
      />
      <Stack.Screen name="Orders" component={OrdersStack} />
    </Stack.Navigator>
  );
};

export default ExlporeStack;

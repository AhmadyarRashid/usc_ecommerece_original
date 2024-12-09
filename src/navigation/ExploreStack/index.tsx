import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreScreen from "../../screens/Explore";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";
import MyComplaintsScreen from "../../screens/MyComplaints";

const Stack = createNativeStackNavigator();

const ExlporeStack: React.FC = () => {

  useTabBarVisibility()

  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="MyComplaints" component={MyComplaintsScreen} />
    </Stack.Navigator>
  );
};

export default ExlporeStack;

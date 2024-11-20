import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyProfileScreen from "../../screens/MyProfile";

import useTabBarVisibility from "../../hooks/useTabBarVisibility";

const Stack = createNativeStackNavigator();

const ProfileStack: React.FC = () => {

  useTabBarVisibility()

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

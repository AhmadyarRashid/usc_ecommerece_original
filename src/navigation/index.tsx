import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNavigation;

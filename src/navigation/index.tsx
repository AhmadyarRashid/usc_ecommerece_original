import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./AppStack";

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigation;

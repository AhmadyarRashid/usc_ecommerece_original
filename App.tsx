import { SafeAreaView } from "react-native";

import AppNavigation from "./src/navigation";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigation />
    </SafeAreaView>
  );
};

export default App;

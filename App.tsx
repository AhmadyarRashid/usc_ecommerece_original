import { SafeAreaView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import NetworkLogger from "react-native-network-logger";
import Toast from "react-native-toast-message";

import AppNavigation from "./src/navigation";

import { persistor, store } from "./src/redux/store";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate
              // loading={<Text>Loading...</Text>}
              persistor={persistor}
            >
              <AppNavigation />
              {/* <NetworkLogger /> */}
              <Toast />
            </PersistGate>
          </Provider>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

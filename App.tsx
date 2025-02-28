import { SafeAreaView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import NetworkLogger from "react-native-network-logger";
import Toast from "react-native-toast-message";
import { I18nextProvider } from "react-i18next";

import AppNavigation from "./src/navigation";

import { persistor, store } from "./src/redux/store";
import i18n from "./src/localization/i18n";

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
              <I18nextProvider i18n={i18n}>
                <AppNavigation />
              </I18nextProvider>
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

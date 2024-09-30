import { useCallback } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import InputField from "../../components/TextInput/InputField";
import SolidButton from "../../components/Button/SolidButton";

import { BLACK, FLINT_STONE, WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";

const ConfirmAddressScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Confirm Address" onPress={goBack} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        <Text style={styles.normalText}>
          By adding your address, we will make sure your orders are delivered
          correctly and on time. This also speeds up the checkout process for
          future purchases, ensuring smooth transactions and accurate shipping
          options.
        </Text>

        <VerticalSpace h={2} />

        <Text style={styles.labelText}>House/Building/Flat</Text>

        <VerticalSpace h={2} />

        <InputField placeholder="Enter house/building/flat #" />

        <VerticalSpace h={2} />

        <Text style={styles.labelText}>Street</Text>

        <VerticalSpace h={2} />

        <InputField placeholder="Enter street" />

        <VerticalSpace h={2} />

        <Text style={styles.labelText}>City</Text>

        <VerticalSpace h={2} />

        <InputField placeholder="Enter city" />

        <VerticalSpace h={2} />

        <Text style={styles.labelText}>
          Additional Delivery Notes/Alternate Contact Information etc.
        </Text>

        <VerticalSpace h={2} />

        <Text style={styles.normalText}>
          Include further details about your address
        </Text>

        <VerticalSpace h={2} />

        <InputField placeholder="Note to rider - e.g landmark" />

        <VerticalSpace h={2} />

        <SolidButton label="Save & Continue" size="xl" onPress={goToHome} />
      </ScrollView>
    </View>
  );
};

export default ConfirmAddressScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: WHITE },
  scrollViewContainer: { paddingHorizontal: wR * 4 },
  labelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.4,
  },
  normalText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    opacity: 0.6,
    fontSize: sR * 1.2,
  },
});

import React, { useCallback, useMemo, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { Edit2, Gps, Location } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import LottieAnimation from "../../components/LottieAnimation";
import SolidButton from "../../components/Button/SolidButton";
import HorizontalSpace from "../../components/HorizontalSpace";

import {
  BLACK,
  FLINT_STONE,
  THEME,
  WHITE,
  WHITE_SMOKE,
} from "../../constants/colors";
import { NO_ADDRESS_FOUND } from "../../constants/animations";
import { hR, sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import { AppNavigationProps } from "../../constants/navigationTypes";

type Address = {
  label: string;
  value: string;
};

const ADDRESSES: Address[] = [
  {
    label: "Sector H-8",
    value: "Street # 15, House # 15-A, H-8, Islamabad",
  },
  {
    label: "Sector H-13",
    value: "Street # 15, House # 15-A, H-13, Islamabad",
  },
];

const DeliveryAddressScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<AppNavigationProps>();
  const snapPoints = useMemo(() => ["32%", "80%"], []);

  const initialRegion: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToConfirmAddress = useCallback(() => {
    navigation.navigate('ConfirmAddress')
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Delivery Address" onPress={goBack} />

      <MapView
        provider="google"
        initialRegion={initialRegion}
        style={styles.mapContainer}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bottomSheetRootContainer}>
            <TouchableOpacity style={styles.currentLocationButton}>
              <View style={styles.gpsContainer}>
                <Gps size={sR * 1.6} color={WHITE} variant="Bold" />
              </View>

              <HorizontalSpace w={4} />

              <Text style={styles.currentLocationText}>
                Use my current location
              </Text>
            </TouchableOpacity>

            <VerticalSpace h={2} />

            {ADDRESSES.length === 0 ? (
              <View style={styles.addressNotFoundContainer}>
                <LottieAnimation
                  source={NO_ADDRESS_FOUND}
                  customStyle={styles.animation}
                  loop={true}
                />

                <Text style={styles.addressNotFoundPrimaryText}>
                  Your address book is empty
                </Text>
                <Text style={styles.addressNotFoundSecondaryText}>
                  Add your preferred delivery address{`\n`}to help us serve you
                  better
                </Text>
              </View>
            ) : (
              <>
                {ADDRESSES.map((item, index) => (
                  <TouchableOpacity style={styles.addressButton} key={index}>
                    <Location size={sR * 2} color={THEME} variant="Bold" />

                    <HorizontalSpace w={2} />

                    <View>
                      <Text style={styles.addressLabelText}>{item.label}</Text>
                      <Text style={styles.addressValueText}>{item.value}</Text>
                    </View>

                    <HorizontalSpace w={2} />

                    <TouchableOpacity>
                      <Edit2 size={sR * 1.2} color={THEME} variant="Bold" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <VerticalSpace h={2} />

            <SolidButton label="Create Address" size="xl" onPress={goToConfirmAddress}/>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: WHITE },
  mapContainer: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: WHITE,
  },
  bottomSheetRootContainer: {
    flex: 1,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
  },
  addressNotFoundContainer: {
    alignItems: "center",
  },
  animation: {
    height: sR * 12,
    width: sR * 12,
  },
  addressNotFoundPrimaryText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  addressNotFoundSecondaryText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textAlign: "center",
  },
  currentLocationButton: {
    paddingVertical: hR * 2,
    paddingHorizontal: wR * 4,
    backgroundColor: WHITE_SMOKE,
    borderRadius: sR,
    flexDirection: "row",
    alignItems: "center",
  },
  gpsContainer: {
    padding: sR * 0.8,
    borderRadius: sR,
    backgroundColor: THEME,
  },
  currentLocationText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
  },
  addressButton: {
    flexDirection: "row",
    marginVertical: hR * 2,
    paddingHorizontal: wR * 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.3,
    color: BLACK,
    marginBottom: hR * 0.6,
  },
  addressValueText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

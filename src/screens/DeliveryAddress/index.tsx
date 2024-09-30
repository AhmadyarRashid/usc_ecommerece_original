// import React, { useState } from 'react';
// import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// import { THEME } from '../../constants/colors';
// import LottieView from 'lottie-react-native';
// import { MARKER } from '../../constants/animations';

// const latitudeDelta = 0.025;
// const longitudeDelta = 0.025;

// const DeliveryAddressScreen = () => {
//   const [region, setRegion] = useState({
//     latitudeDelta,
//     longitudeDelta,
//     latitude: 25.1948475,
//     longitude: 55.2682899
//   });

//   console.log(region);
  

//   const onRegionChange = (region) => {
//     setRegion(region);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={region}
//         onRegionChangeComplete={onRegionChange}
//       />
//       <View style={styles.markerFixed}>
//       <LottieView source={MARKER} autoPlay loop style={{height:120,width:120}} />
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   map: {
//     flex: 1
//   },
//   markerFixed: {
//     left: '40%',
//     position: 'absolute',
//     top: '30%'
//   },
//   marker: {
//     height: 48,
//     width: 48
//   },
//   footer: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     bottom: 0,
//     position: 'absolute',
//     width: '100%'
//   },
//   region: {
//     color: '#fff',
//     lineHeight: 20,
//     margin: 20
//   }
// });

// export default DeliveryAddressScreen;






















































import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { Edit2, Gps, Location } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import LottieAnimation from "../../components/LottieAnimation";
import SolidButton from "../../components/Button/SolidButton";
import HorizontalSpace from "../../components/HorizontalSpace";
import Loader from "../../components/Loader";

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
import useApiHook from "../../hooks/rest/useApi";
import { setAddressFields } from "../../redux/slices/address";
import { displayToast } from "../../constants/functions";
import { createDynamicSelector } from "../../redux/selectors";
import { RootState } from "../../redux/store";

const DeliveryAddressScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<AppNavigationProps>();
  const snapPoints = useMemo(() => ["32%", "80%"], []);
  const { handleRestApi, restApiLoading } = useApiHook();
  const selectAuthAddressOrder = createDynamicSelector([
    "auth",
    "address",
  ] as const);
  const { auth, address } = useSelector((state: RootState) =>
    selectAuthAddressOrder(state)
  );
  const dispatch = useDispatch();

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getAddresses();
  }, []);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const getAddresses = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
    };
    const response = await handleRestApi({
      method: "post",
      url: "user_address_view_all",
      data,
    });

    if (response?.data?.result?.status === 200) {
      dispatch(
        setAddressFields({
          addressList: response?.data?.result?.address,
        })
      );
    } else {
      displayToast({
        type: "error",
        text1: "Error",
        text2: response?.data?.result?.error,
      });
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToConfirmAddress = useCallback(() => {
    navigation.navigate("ConfirmAddress");
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label="Delivery Address" onPress={goBack} />

      {/* <MapView
        provider="google"
        initialRegion={region}
        style={styles.mapContainer}
        onRegionChangeComplete={onRegionChange}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          pinColor={THEME}
          draggable
          onDragEnd={(e) => {
            console.log(e);
          }}
        />
      </MapView> */}

      

      {/* <BottomSheet
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

            {address.addressList.length === 0 ? (
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
                {address.addressList.map((item, index) => (
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

            <SolidButton
              label="Create Address"
              size="xl"
              onPress={goToConfirmAddress}
            />
          </View>
        </ScrollView>
      </BottomSheet> */}
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

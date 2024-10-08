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
import MapView, { Region } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Edit2,
  Gps,
  Lifebuoy,
  Location,
  MoreCircle,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import LottieAnimation from "../../components/LottieAnimation";
import SolidButton from "../../components/Button/SolidButton";
import HorizontalSpace from "../../components/HorizontalSpace";
import Loader from "../../components/Loader";
import AddressActionModal from "../../components/Modals/AddressActionModal";

import {
  BLACK,
  FLINT_STONE,
  THEME,
  WHITE,
  WHITE_SMOKE,
} from "../../constants/colors";
import { MARKER, NO_ADDRESS_FOUND } from "../../constants/animations";
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
import { latitudeDelta, longitudeDelta } from "../../constants/misc";
import useToggle from "../../hooks/useToggle";

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
  const [ actionModal, toggleActionModal ] = useToggle(false);
  
  const [region, setRegion] = useState<Region>({
    latitudeDelta,
    longitudeDelta,
    latitude: 25.1948475,
    longitude: 55.2682899,
  });

  useEffect(() => {
    getAddresses();
  }, []);

  const onRegionChange = (region: Region) => {
    console.log(region);

    setRegion(region);
  };

  const getAddresses = async () => {
    if (!auth?.accessToken || !auth?.userName) return;

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
          addressList: response?.data?.result?.address || [],
        })
      );
    } else {
      displayToast({
        type: "error",
        text1: "Error",
        text2: response?.data?.result?.error || "Failed to fetch addresses",
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

      <AddressActionModal
        isVisible={actionModal}
        onClose={toggleActionModal}
        handleUpdate={() => alert("update")}
        handleDelete={() => alert("delete")}
      />

      <HeaderPrimary label="Delivery Address" onPress={goBack} />

      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        provider="google"
      />

      <View style={styles.markerContainer}>
        <LottieAnimation source={MARKER} customStyle={styles.marker} />
      </View>

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

            {address?.addressList?.length === 0 ? (
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
                {address?.addressList?.map((item, index) => (
                  <View style={styles.addressButton} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Location size={sR * 2} color={THEME} variant="Bold" />

                      <HorizontalSpace w={4} />

                      <View>
                        <Text style={styles.addressLabelText}>{item.name}</Text>
                        <Text style={styles.addressValueText}>
                          {item.street}, {item.city}
                        </Text>
                      </View>
                    </View>

                    <HorizontalSpace w={2} />

                    <TouchableOpacity onPress={toggleActionModal}>
                      <MoreCircle size={sR * 1.6} color={THEME} />
                    </TouchableOpacity>
                  </View>
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
      </BottomSheet>
    </View>
  );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: WHITE },
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
  markerContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "38%",
  },
  marker: { height: sR * 6, width: sR * 6 },
});

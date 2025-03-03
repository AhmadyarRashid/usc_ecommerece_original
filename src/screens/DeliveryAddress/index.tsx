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
import { Gps, Location, MoreCircle } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import useStateRef from "react-usestateref";
import { isNull } from "lodash";
import { useTranslation } from "react-i18next";

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
import { latitudeDelta, longitudeDelta } from "../../constants/misc";
import useToggle from "../../hooks/useToggle";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import useUserCurrentLocation from "../../hooks/useUserCurrentLocation";

const DeliveryAddressScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const snapPoints = useMemo(() => ["32%", "80%"], []);
  const { handleRestApi, restApiLoading } = useApiHook();
  const { auth, address } = useDynamicSliceSelector(["auth", "address"]);
  const [actionModal, toggleActionModal] = useToggle(false);
  const { location, requestUserCurrentLocation } = useUserCurrentLocation();
  const { t } = useTranslation();

  const [region, setRegion] = useState<Region>({
    latitudeDelta,
    longitudeDelta,
    latitude: 33.6995,
    longitude: 73.0363,
  });
  const [id, setId, idRef] = useStateRef<number | null>(null);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      setRegion((prev) => ({
        ...prev,
        ...location,
      }));
    }
  }, [location]);

  useEffect(() => {
    if (region && mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [region]);

  const onRegionChange = useCallback((updatedRegion: Region) => {
    setRegion(updatedRegion);
  }, []);

  const deleteAddress = useCallback(async () => {
    if (address?.addressList.length < 2) {
      alert(
        `Please ensure your address book contains more than one addresses before deleting!`
      );

      toggleActionModal();

      return;
    }

    if (!idRef.current) return;

    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      id: idRef.current,
    };

    const response = await handleRestApi({
      method: "post",
      url: "user_address_delete",
      data,
    });

    if (response?.data?.result?.status === 200) {
      dispatch(
        setAddressFields({
          addressList: address?.addressList.filter(
            (item) => item.id !== idRef.current
          ),
        })
      );

      displayToast({
        type: "success",
        text1: "Success",
        text2: "Selected address has been successfully deleted!",
      });

      toggleActionModal();
    }
  }, [
    address?.addressList,
    auth.accessToken,
    auth.userName,
    dispatch,
    handleRestApi,
    idRef,
    toggleActionModal,
  ]);

  const updateAddress = useCallback(async () => {
    if (!idRef.current) return;

    const itemToUpdate = address?.addressList.find(
      (item) => item.id === idRef.current
    );

    const { latitudeDelta, longitudeDelta, ...restRegionData } = region;

    const addressData = {
      ...itemToUpdate,
      ...restRegionData,
    };

    goToConfirmAddress(addressData);
  }, [address, region]);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      return;
    }
  }, [navigation]);

  const goToConfirmAddress = useCallback(
    (data: any) => {
      navigation.navigate("ConfirmAddress", {
        addressData: data,
      });
    },
    [navigation]
  );

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <AddressActionModal
        isVisible={actionModal}
        onClose={() => {
          setId(null);
          toggleActionModal();
        }}
        handleUpdate={updateAddress}
        handleDelete={deleteAddress}
      />

      <HeaderPrimary
        label={t(`DELIVERY_ADDRESS.DELIVERY_ADDRESS`)}
        onPress={goBack}
      />

      <MapView
        ref={mapRef}
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
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={requestUserCurrentLocation}
            >
              <View style={styles.gpsContainer}>
                <Gps size={sR * 1.6} color={WHITE} variant="Bold" />
              </View>

              <HorizontalSpace w={4} />

              <Text style={styles.currentLocationText}>
                {t(`DELIVERY_ADDRESS.USE_CURRENT_LOCATION`)}
              </Text>
            </TouchableOpacity>

            <VerticalSpace h={2} />

            <SolidButton
              label={t(`DELIVERY_ADDRESS.CREATE_ADDRESS_BUTTON`)}
              size="xl"
              onPress={() => goToConfirmAddress(region)}
            />

            <VerticalSpace h={2} />

            {address?.addressList?.length === 0 ? (
              <View style={styles.addressNotFoundContainer}>
                <LottieAnimation
                  source={NO_ADDRESS_FOUND}
                  customStyle={styles.animation}
                  loop
                />

                <Text style={styles.addressNotFoundPrimaryText}>
                  {t(`DELIVERY_ADDRESS.EMPTY_ADDRESS_BOOK`)}
                </Text>
                <Text style={styles.addressNotFoundSecondaryText}>
                  {t(`DELIVERY_ADDRESS.ADD_ADDRESS_NOTE`)}
                </Text>
              </View>
            ) : (
              address?.addressList?.map((item, index) => (
                <View style={styles.addressButton} key={item.id || index}>
                  <View style={styles.addressInfoContainer}>
                    <Location size={sR * 2} color={THEME} variant="Bold" />
                    <HorizontalSpace w={4} />
                    <View>
                      <Text style={styles.addressLabelText}>{item.name}</Text>
                      <Text style={styles.addressValueText}>
                        {item.street}, {item.city}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setId(item?.id);
                      toggleActionModal();
                    }}
                  >
                    <MoreCircle size={sR * 1.6} color={THEME} />
                  </TouchableOpacity>
                </View>
              ))
            )}
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
  addressInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    top: "48%",
  },
  marker: { height: sR * 6, width: sR * 6 },
});

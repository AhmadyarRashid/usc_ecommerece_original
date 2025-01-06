import { useState } from "react";
import { Platform, Linking, Alert } from "react-native";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
// import Geolocation from 'react-native-geolocation-service';

Geocoder.init(`AIzaSyBTeLrtINLgEkbLURT3UfB_Kzg9ASbziVM`);

interface Location {
  longitude: number;
  latitude: number;
}

const useUserCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const requestUserCurrentLocation = async (): Promise<void> => {
    try {
      if (Platform.OS === "ios") {
        // const authStatus = await Geolocation.requestAuthorization("whenInUse");
        // if (authStatus === "granted") {
        //   getCurrentLocation();
        // } else {
        //   displayLocationPermissionAlert(
        //     "Location permission is denied. Please allow the app to access your location."
        //   );
        // }
      } else {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        switch (result) {
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
            displayLocationPermissionAlert(
              "Location permission is denied. Please allow the app to access your location."
            );
            break;
          case RESULTS.GRANTED:
            getCurrentLocation();
            break;
          case RESULTS.BLOCKED:
            displayLocationPermissionAlert(
              "Location permission is blocked in device settings. Please enable it to continue."
            );
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error requesting location permissions:", error);
    }
  };

  const displayLocationPermissionAlert = (message: string): void => {
    Alert.alert("Location Permission", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => {
          Linking.openSettings().catch(() => {
            Alert.alert(
              "Error",
              "Unable to open settings. Please enable location services manually."
            );
          });
        },
      },
    ]);
  };

  const getCurrentLocation = (): void => {
    Geolocation.getCurrentPosition(
      async (res) => {
        try {
          setLocation({
            latitude: res?.coords?.latitude,
            longitude: res?.coords?.longitude,
          });
        } catch (error) {
          // Handle error
        }
      },
      (error) => {
        if (error.code === 2) {
          displayLocationPermissionAlert(
            "GPS on your device is disabled. Please enable it for accurate location services."
          );
        }
      }
    );
  };

  return { location, requestUserCurrentLocation };
};

export default useUserCurrentLocation;

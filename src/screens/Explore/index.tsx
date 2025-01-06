import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import {
  CallAdd,
  DirectboxReceive,
  Document,
  DocumentCode2,
  FolderAdd,
  Global,
  MenuBoard,
  MessageAdd,
  ProfileAdd,
  ShieldTick,
  Task,
} from "iconsax-react-native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import HorizontalSpace from "../../components/HorizontalSpace";
import SectionDescriptionText from "./components/SectionDescriptionText";
import MenuItem from "./components/MenuItem";
import HorizontalLine from "../../components/HorizontalLine";

import {
  BLACK,
  FLINT_STONE,
  RED_DOOR,
  WHITE,
  WHITE_SMOKE,
} from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import images from "../../constants/images";
import { hR, sR, wR } from "../../constants/dimensions";
import TextButton from "../../components/Button/TextButton";
import {
  PROXIMA_NOVA_SEMIBOLD,
  PROXIMA_NOVA_SEMIBOLD_ITALIC,
} from "../../constants/fonts";
import { store } from "../../redux/store";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";

const ICON_SIZE = sR * 1.8;
const ICON_COLOR = FLINT_STONE;
const WEBURL = `https://usc.org.pk/`;

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { auth } = useDynamicSliceSelector([
    "auth",
  ]);


  console.log('auth ',JSON.stringify(auth,null,2));
  

  const openURL = (URL: string) => {
    Linking.openURL(URL);
  };

  const logout = () => {
    store.dispatch({ type: "RESET_APP" });

    navigation.reset({
      index: 0,
      routes: [{ name: "Register" }],
    });
  };

  const handleContactUs = () => {
    Linking.openURL(`tel:+9234564345`);
  };

  const handleFeedback = () => {
    Linking.openURL("mailto:support@example.com");
  };

  const goToMyComplaints = useCallback(() => {
    navigation.navigate("MyComplaints");
  }, [navigation]);

  const goToRegisterComplaint = useCallback(() => {
    navigation.navigate("RegisterComplaint");
  }, [navigation]);

  const goToAppInfo = useCallback(() => {
    navigation.navigate("AppInfo");
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Explore" onPress={goBack} />

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VerticalSpace h={2} />

          <Image source={images.LOGO} style={styles.logo} />

          <VerticalSpace h={2} />

          <Text style={styles.sectionHeaderText}>PROFILE</Text>
          <View style={{ ...styles.sectionContainer, paddingVertical: hR * 2 }}>
            <View style={styles.profileDetailsContainer}>
              <Image source={images.PROFILE} style={styles.profileImage} />

              <HorizontalSpace w={4} />

              <View>
                <View>
                  {/* <Text style={styles.userNameText}>Saran Ahmed</Text> */}
                  <Text style={styles.contactInfoText}>{auth?.userName}</Text>
                </View>

                <VerticalSpace h={1} />

                <TextButton
                  label="Sign Out"
                  customLabelStyle={{ color: RED_DOOR }}
                  onPress={logout}
                />
              </View>
            </View>
          </View>

          <SectionDescriptionText
            text={`This section showcases your profile image, name, and contact details. Don’t forget to log out when you’re done.`}
          />

          <Text style={styles.sectionHeaderText}>SUPPORT</Text>

          <View style={styles.sectionContainer}>
            <MenuItem
              label="Feedback"
              icon={<MessageAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={handleFeedback}
            />

            <HorizontalLine />

            <MenuItem
              label="Contact Us"
              icon={<CallAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={handleContactUs}
            />

            <HorizontalLine />

            <MenuItem
              label="Register Complaint"
              icon={<FolderAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToRegisterComplaint}
            />

            <HorizontalLine />

            <MenuItem
              label="My Complaints"
              icon={<MenuBoard size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToMyComplaints}
            />

            {/* <HorizontalLine />

            <MenuItem
              label="My Orders"
              icon={<DirectboxReceive size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={() => navigation.navigate("Orders")}
            /> */}
          </View>

          <SectionDescriptionText
            text={`This section showcases the various ways you can get in touch with us. Share your feedback or contact support for assistance.`}
          />

          <Text style={styles.sectionHeaderText}>ABOUT US</Text>

          <View style={styles.sectionContainer}>
            <MenuItem
              label="Privacy Policy"
              icon={<ShieldTick size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={() => openURL(WEBURL)}
            />

            <HorizontalLine />

            <MenuItem
              label="Terms & Conditions"
              icon={<Document size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={() => openURL(WEBURL)}
            />

            <HorizontalLine />

            <MenuItem
              label="Visit Our Website"
              icon={<Global size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={() => openURL(WEBURL)}
            />

            <HorizontalLine />

            <MenuItem
              label="App Info"
              icon={<DocumentCode2 size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToAppInfo}
            />

            <HorizontalLine />

            <MenuItem
              label="Invite A Friend"
              icon={<ProfileAdd size={ICON_SIZE} color={ICON_COLOR} />}
            />

            <HorizontalLine />

            <MenuItem
              label="How To Use?"
              icon={<Task size={ICON_SIZE} color={ICON_COLOR} />}
            />
          </View>

          <SectionDescriptionText
            text={`This section showcases essential information about us. Read the Privacy Policy and Terms & Conditions, check out the app details, visit our website for more, and invite a friend to join the experience.`}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: WHITE,
    flex: 1,
  },
  logo: {
    height: sR * 8,
    width: sR * 8,
    alignSelf: "center",
  },
  sectionHeaderText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD_ITALIC,
    fontSize: sR * 1.4,
    color: BLACK,
    marginBottom: hR * 2,
    marginLeft: wR * 4,
  },
  scrollContainer: { flex: 1 },
  sectionContainer: {
    paddingHorizontal: wR * 4,
    backgroundColor: WHITE_SMOKE,
  },
  profileDetailsContainer: {
    flexDirection: "row",
  },
  profileImage: {
    height: sR * 5,
    width: sR * 5,
    borderRadius: sR * 2.5,
  },
  userNameText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color:BLACK
  },
  contactInfoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

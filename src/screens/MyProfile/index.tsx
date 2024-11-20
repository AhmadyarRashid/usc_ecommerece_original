import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import {
  CallAdd,
  Document,
  DocumentCode2,
  Global,
  MessageAdd,
  ProfileAdd,
  ShieldTick,
  Task,
} from "iconsax-react-native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import HorizontalSpace from "../../components/HorizontalSpace";
import SectionDescriptionText from "./components/SectionDescriptionText";
import MenuItem from "./components/MenuIItem";
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

const ICON_SIZE = sR * 1.8;
const ICON_COLOR = FLINT_STONE;

const MyProfileScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label="Menu" onPress={goBack} />

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VerticalSpace h={2} />

          <Image source={images.LOGO} style={styles.logo} />

          <VerticalSpace h={2} />

          <Text style={styles.sectionHeaderText}>PROFILE</Text>

          <View style={styles.sectionContainer}>
            <View style={styles.profileDetailsContainer}>
              <Image source={images.PROFILE} style={styles.profileImage} />

              <HorizontalSpace w={4} />

              <View>
                <View>
                  <Text style={styles.userNameText}>Saran Ahmed</Text>
                  <Text style={styles.contactInfoText}>+923119578954</Text>
                </View>

                <VerticalSpace h={1} />

                <TextButton
                  label="Sign Out"
                  customLabelStyle={{ color: RED_DOOR }}
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
            />

            <HorizontalLine />

            <MenuItem
              label="Contact Us"
              icon={<CallAdd size={ICON_SIZE} color={ICON_COLOR} />}
            />
          </View>

          <SectionDescriptionText
            text={`This section showcases the various ways you can get in touch with us. Share your feedback or contact support for assistance.`}
          />

          <Text style={styles.sectionHeaderText}>ABOUT US</Text>

          <View style={styles.sectionContainer}>
            <MenuItem
              label="Privacy Policy"
              icon={<ShieldTick size={ICON_SIZE} color={ICON_COLOR} />}
            />

            <HorizontalLine />

            <MenuItem
              label="Terms & Condition"
              icon={<Document size={ICON_SIZE} color={ICON_COLOR} />}
            />

            <HorizontalLine />

            <MenuItem
              label="Visit Our Website"
              icon={<Global size={ICON_SIZE} color={ICON_COLOR} />}
            />

            <HorizontalLine />

            <MenuItem
              label="App Info"
              icon={<DocumentCode2 size={ICON_SIZE} color={ICON_COLOR} />}
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

export default MyProfileScreen;

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
    paddingVertical: hR * 2,
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
  },
  contactInfoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

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
import { openURL } from "../../constants/functions";

const ICON_SIZE = sR * 1.8;
const ICON_COLOR = FLINT_STONE;
const WEBURL = `https://usc.org.pk/`;
const TELL = `tel:+9234564345`;
const MAIL_TO = `mailto:support@example.com`;

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { auth } = useDynamicSliceSelector(["auth"]);
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation();

  const logout = () => {
    store.dispatch({ type: "RESET_APP" });

    navigation.reset({
      index: 0,
      routes: [{ name: "SelectLanguage" }],
    });
  };

  const handleURL = () => {
    console.log("asds");

    // openURL(WEBURL)
  };

  const goToMyComplaints = useCallback(() => {
    navigation.navigate("MyComplaints");
  }, [navigation]);

  const goToOrders = useCallback(() => {
    navigation.navigate("Orders");
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
      <HeaderPrimary label={t(`EXPLORE.EXPLORE`)} onPress={goBack} />

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VerticalSpace h={2} />

          <Image source={images.LOGO} style={styles.logo} />

          <VerticalSpace h={2} />

          <Text style={styles.sectionHeaderText}>{t(`EXPLORE.PROFILE`)}</Text>
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
                  label={t(`EXPLORE.SIGN_OUT`)}
                  customLabelStyle={{ color: RED_DOOR }}
                  onPress={logout}
                />
              </View>
            </View>
          </View>

          <SectionDescriptionText text={t(`EXPLORE.PROFILE_INFO`)} />

          <Text style={styles.sectionHeaderText}>{t(`EXPLORE.SUPPORT`)}</Text>

          <View style={styles.sectionContainer}>
            <MenuItem
              label={t(`EXPLORE.FEEDBACK`)}
              icon={<MessageAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={() => openURL(MAIL_TO)}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.CONTACT_US`)}
              icon={<CallAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={() => openURL(TELL)}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.REGISTER_COMPLAINT`)}
              icon={<FolderAdd size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToRegisterComplaint}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.MY_COMPLAINTS`)}
              icon={<MenuBoard size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToMyComplaints}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.MY_ORDERS`)}
              icon={<DirectboxReceive size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToOrders}
            />
          </View>

          <SectionDescriptionText text={t(`EXPLORE.SUPPORT_INFO`)} />

          <Text style={styles.sectionHeaderText}>{t(`EXPLORE.ABOUT_US`)}</Text>

          <View style={styles.sectionContainer}>
            <MenuItem
              label={t(`EXPLORE.PRIVACY_POLICY`)}
              icon={<ShieldTick size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={handleURL}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.TERMS_CONDITIONS`)}
              icon={<Document size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={handleURL}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.VISIT_WEBSITE`)}
              icon={<Global size={ICON_SIZE} color={ICON_COLOR} />}
              onPress={handleURL}
            />

            <HorizontalLine />

            <MenuItem
              label={t(`EXPLORE.APP_INFO`)}
              icon={<DocumentCode2 size={ICON_SIZE} color={ICON_COLOR} />}
              onMenuItemPress={goToAppInfo}
            />

            {/* <HorizontalLine />

            <MenuItem
              label="Invite A Friend"
              icon={<ProfileAdd size={ICON_SIZE} color={ICON_COLOR} />}
            />

            <HorizontalLine />

            <MenuItem
              label="How To Use?"
              icon={<Task size={ICON_SIZE} color={ICON_COLOR} />}
            /> */}
          </View>

          <SectionDescriptionText text={t(`EXPLORE.ABOUT_US_INFO`)} />
        </ScrollView>
      </View>

      <View style={{ height: tabBarHeight }} />
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
    alignItems:"center"
  },
  profileImage: {
    height: sR * 5,
    width: sR * 5,
    borderRadius: sR * 2.5,
  },
  userNameText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  contactInfoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

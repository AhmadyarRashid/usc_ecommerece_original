import React, { createRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import { Add, DirectboxReceive, Home2 } from "iconsax-react-native";

import VerticalSpace from "../../components/VerticalSpace";

import HomeStack from "../HomeStack";
import OrdersStack from "../OrdersStack";

import {
  BLACK,
  THEME,
  WHITE,
} from "../../constants/colors";
import { hR, sR } from "../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../constants/fonts";

const ICON_SIZE = sR * 1.8;
export const tabBarRef = createRef();

interface TabItemProps {
  routeName: string;
  selectedTab: string;
  navigate: (routeName: string) => void;
}

const AppTabs: React.FC = () => {
  const tabItem = ({ routeName, selectedTab, navigate }: TabItemProps) => {
    const iconConfig: {
      [key: string]: {
        icon: React.ReactElement;
        text: string;
      };
    } = {
      Home: {
        icon: (
          <Home2
            size={ICON_SIZE}
            color={selectedTab === "Home" ? THEME : BLACK}
          />
        ),
        text: routeName,
      },
      Orders: {
        icon: (
          <DirectboxReceive
            size={ICON_SIZE}
            color={selectedTab === "Orders" ? THEME : BLACK}
          />
        ),
        text: routeName,
      },
    };

    const { icon, text } = iconConfig[routeName] || { icon: null, text: "" };

    const textStyles = {
      fontFamily: PROXIMA_NOVA_SEMIBOLD,
      fontSize: sR * 1.2,
      color: selectedTab === routeName ? THEME : BLACK,
    };

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarItem}
      >
        {icon}
        <VerticalSpace h={0.6} />
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const tabCenterIcon = () => {
    return (
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => alert(`place order screen in-progress`)}
      >
        <Add size={sR * 2} color={WHITE} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <CurvedBottomBar.Navigator
        ref={tabBarRef}
        type="DOWN"
        bgColor={WHITE}
        initialRouteName="Home"
        renderCircle={tabCenterIcon}
        tabBar={tabItem}
        screenOptions={{ headerShown: false }}
        shadowStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={HomeStack}
        />

        <CurvedBottomBar.Screen
          name="Orders"
          position="RIGHT"
          component={OrdersStack}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

export default AppTabs;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleButton: {
    width: sR * 4,
    height: sR * 4,
    backgroundColor: THEME,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sR * 2.5,
    bottom: hR * 2,

    shadowColor: THEME,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.72,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

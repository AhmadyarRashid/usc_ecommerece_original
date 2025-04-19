import React, {createRef, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {
  DirectboxReceive,
  Home2,
  Profile,
  SearchNormal1,
  Setting2,
  ShoppingCart,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import VerticalSpace from '../../components/VerticalSpace';

import HomeStack from '../HomeStack';
import ExlporeStack from '../ExploreStack';
import MyProfileScreen from '../../screens/MyProfile';
import CartStack from '../CartStack';

import {BLACK, THEME, WHITE} from '../../constants/colors';
import {hR, sR} from '../../constants/dimensions';
import {PROXIMA_NOVA_SEMIBOLD} from '../../constants/fonts';
import {AppNavigationProps} from '../../constants/navigationTypes';

const ICON_SIZE = sR * 2.4;
export const tabBarRef = createRef();

interface TabItemProps {
  routeName: string;
  selectedTab: string;
  navigate: (routeName: string) => void;
}

const AppTabs: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const tabItem = ({routeName, selectedTab, navigate}: TabItemProps) => {
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
            color={selectedTab === 'Home' ? THEME : BLACK}
            variant="Broken"
          />
        ),
        text: routeName,
      },
      ShoppingCart: {
        icon: (
          <ShoppingCart
            size={ICON_SIZE}
            color={selectedTab === 'ShoppingCart' ? THEME : BLACK}
            variant="Broken"
          />
        ),
        text: routeName,
      },
      Explore: {
        icon: (
          <Setting2
            size={ICON_SIZE}
            color={selectedTab === 'Explore' ? THEME : BLACK}
            variant="Broken"
          />
        ),
        text: routeName,
      },
      MyProfile: {
        icon: (
          <Profile
            size={ICON_SIZE}
            color={selectedTab === 'MyProfile' ? THEME : BLACK}
            variant="Broken"
          />
        ),
        text: routeName,
      },
    };

    const {icon, text} = iconConfig[routeName] || {icon: null, text: ''};

    const textStyles = {
      fontFamily: PROXIMA_NOVA_SEMIBOLD,
      fontSize: sR * 1.2,
      color: selectedTab === routeName ? THEME : BLACK,
    };

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarItem}>
        {icon}
      </TouchableOpacity>
    );
  };

  const tabCenterIcon = () => {
    return (
      <TouchableOpacity
        style={styles.circleButton}
        onPress={goToSearchProducts}>
        <SearchNormal1 size={sR * 2} color={WHITE} />
      </TouchableOpacity>
    );
  };

  const goToSearchProducts = useCallback(() => {
    navigation.navigate('SearchProducts');
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <CurvedBottomBar.Navigator
        ref={tabBarRef}
        type="UP"
        bgColor={WHITE}
        initialRouteName="Home"
        renderCircle={tabCenterIcon}
        tabBar={tabItem}
        screenOptions={{headerShown: false}}>
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={HomeStack}
        />

        <CurvedBottomBar.Screen
          name="ShoppingCart"
          position="LEFT"
          component={CartStack}
        />

        <CurvedBottomBar.Screen
          name="Explore"
          position="RIGHT"
          component={ExlporeStack}
        />

        <CurvedBottomBar.Screen
          name="MyProfile"
          position="RIGHT"
          component={MyProfileScreen}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    width: sR * 4,
    height: sR * 4,
    backgroundColor: THEME,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sR * 2.5,
    bottom: hR * 2,
  },
});

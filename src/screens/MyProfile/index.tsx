import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import HeaderPrimary from '../../components/Header/HeaderPrimary';
import HorizontalSpace from '../../components/HorizontalSpace';
import LanguageToggle from '../Explore/components/LanguageToggle';
import VerticalSpace from '../../components/VerticalSpace';
import SolidButton from '../../components/Button/SolidButton';

import {FLINT_STONE, THEME, WHITE} from '../../constants/colors';
import {hR, sR, wR} from '../../constants/dimensions';
import {languageOptions} from '../../constants/misc';
import i18n from '../../localization/i18n';
import {store} from '../../redux/store';
import {AppNavigationProps} from '../../constants/navigationTypes';
import useDynamicSliceSelector from '../../hooks/useDynamicSliceSelector';
import images from '../../constants/images';

const MyProfileScreen: React.FC = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<AppNavigationProps>();
  const {auth} = useDynamicSliceSelector(['auth']);
  const {t} = useTranslation();

  const handleLanguageToggle = (val: 'en' | 'ur') => {
    i18n.changeLanguage(val);
  };

  const logout = () => {
    store.dispatch({type: 'RESET_APP'});

    navigation.reset({
      index: 0,
      routes: [{name: 'Welcome'}],
    });
  };

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={t('MY_PROFILE.MY_PROFILE')} />

      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            }}
          />
          <HorizontalSpace w={4} />
          <View>
            <Text style={styles.userNameText}>MYUSCUSER65</Text>
            <Text style={styles.userPhoneText}>{auth?.userName}</Text>
          </View>
        </View>
        <VerticalSpace h={4} />
        <LanguageToggle
          options={languageOptions}
          onPress={handleLanguageToggle}
        />
      </View>

      <View
        style={[
          styles.logoutContainer,
          {paddingBottom: tabBarHeight + hR * 4},
        ]}>
        <View style={{
            alignItems:"center"
        }}>
          <Image
            style={{
                height:sR*8,
                width:sR*8,
            }}
            source={images.LOGO_PRIMARY}
          />

          <Text style={styles.screenInfoText}>
          {t('MY_PROFILE.SCREEN_INFO')}
          </Text>
        </View>

        <SolidButton
          label={t('MY_PROFILE.LOGOUT')}
          size="lg"
          onPress={logout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  profileContainer: {
    backgroundColor: THEME,
    borderBottomLeftRadius: sR,
    borderBottomRightRadius: sR,
    paddingVertical: hR * 4,
    paddingHorizontal: wR * 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileImage: {
    height: sR * 7,
    width: sR * 7,
    borderRadius: sR * 4,
  },
  userNameText: {
    fontSize: sR * 1.3,
    fontWeight: 'bold',
    color: WHITE,
  },
  userPhoneText: {
    fontSize: sR * 1.2,
    color: WHITE,
  },
  logoutContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingTop: hR * 2,
    paddingHorizontal: wR * 4,
  },
  screenInfoText: {
    textAlign: 'center',
    color: FLINT_STONE,
    fontSize: sR,
    opacity:0.6
  },
});

export default MyProfileScreen;

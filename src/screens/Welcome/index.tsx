import React from 'react';
import {Image, ImageBackground, Text, View, StyleSheet} from 'react-native';

import SolidButton from '../../components/Button/SolidButton';
import VerticalSpace from '../../components/VerticalSpace';

import {WHITE} from '../../constants/colors';
import images from '../../constants/images';
import {sR} from '../../constants/dimensions';
import {PROXIMA_NOVA_SEMIBOLD} from '../../constants/fonts';

const WelcomeScreen: React.FC = () => {
  return (
    <ImageBackground
      source={images.WELCOME}
      style={styles.rootContainer}
      resizeMode="cover">
      <View style={styles.childContainer}>
        <Image
          source={images.LOGO_PRIMARY}
          style={styles.logo}
          resizeMode="contain"
        />

        <VerticalSpace h={2} />

        <Text style={styles.welcomeText}>
          Your premier grocery ordering
          {`\n`}& delivery app
        </Text>

        <VerticalSpace h={2} />

        <SolidButton label="Next" size="xl" />

        <VerticalSpace h={4} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  childContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: sR * 16,
    width: sR * 16,
  },
  welcomeText: {
    color: WHITE,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.6,
    textAlign: 'center',
  },
});

export default WelcomeScreen;

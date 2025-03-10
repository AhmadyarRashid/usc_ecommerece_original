import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import HeaderPrimary from '../Header/HeaderPrimary';
import VerticalSpace from '../VerticalSpace';

import {BLACK, WHITE} from '../../constants/colors';
import images from '../../constants/images';
import {sR, height, width, wR, hR} from '../../constants/dimensions';

interface BlurContainerProps {
  headerLabel: string;
  onBackPress: () => void;
  children?: React.ReactNode;
}

const BlurContainer: React.FC<BlurContainerProps> = ({
  headerLabel,
  onBackPress,
  children,
}) => {
  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={headerLabel} onPress={onBackPress} />

      <VerticalSpace h={4} />

      <Image
        source={images.LOGO_SECONDARY}
        style={styles.logo}
        resizeMode="contain"
        blurRadius={10}
      />

      <View style={styles.childContainer}>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </View>
  );
};

export default BlurContainer;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  logo: {
    height: sR * 12,
    width: sR * 12,
    alignSelf: 'center',
  },
  childContainer: {
    position: 'absolute',
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: wR * 92,
    paddingVertical: hR * 4,
    paddingHorizontal: wR * 4,
    backgroundColor: WHITE,
    alignItems: 'center',
    borderRadius: sR,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

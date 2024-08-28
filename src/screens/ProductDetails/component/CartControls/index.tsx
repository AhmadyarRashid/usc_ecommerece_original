import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AddCircle, MinusCirlce} from 'iconsax-react-native';
import React from 'react';

import HorizontalSpace from '../../../../components/HorizontalSpace';
import SolidButton from '../../../../components/Button/SolidButton';

import {hR, sR, width, wR} from '../../../../constants/dimensions';
import {
  HEAVY_SUGAR,
  JASPER_CANE,
  THEME,
  WHITE,
} from '../../../../constants/colors';
import {PROXIMA_NOVA_SEMIBOLD} from '../../../../constants/fonts';

const CartControls: React.FC = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.incDecContainer}>
        <TouchableOpacity>
          <MinusCirlce size={sR * 2.4} color={THEME} />
        </TouchableOpacity>

        <HorizontalSpace w={4} />

        <Text style={styles.productCountText}>3</Text>

        <HorizontalSpace w={4} />

        <TouchableOpacity>
          <AddCircle size={sR * 2.4} color={THEME} />
        </TouchableOpacity>
      </View>

      <SolidButton label="Add to cart" size="md" />
    </View>
  );
};

export default CartControls;

const styles = StyleSheet.create({
  rootContainer: {
    width,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: JASPER_CANE,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wR * 4,
    paddingVertical: hR,
    backgroundColor: WHITE,
  },
  incDecContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HEAVY_SUGAR,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    borderRadius: 220,
  },
  productCountText: {
    fontSize: sR * 1.3,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
});

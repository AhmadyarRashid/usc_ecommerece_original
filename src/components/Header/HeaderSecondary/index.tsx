import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Location, ShoppingCart} from 'iconsax-react-native';

import HorizontalSpace from '../../HorizontalSpace';

import {hR, sR, wR} from '../../../constants/dimensions';
import {FLINT_STONE, THEME} from '../../../constants/colors';
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../../constants/fonts';

interface HeaderPrimaryProps {}

const HeaderSecondary: React.FC<HeaderPrimaryProps> = ({}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.leftContainer}>
        <Location size={sR * 2.6} color={THEME} variant={'Bulk'} />

        <HorizontalSpace w={2} />

        <TouchableOpacity>
          <Text style={styles.deliveryAddressText}>Delivery Address</Text>
          <Text style={styles.actualAddressText}>92 High Street, London ▼</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <ShoppingCart size={sR * 2.6} color={THEME} variant={'Bulk'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSecondary;

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: hR * 2,
    paddingHorizontal: wR * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {flexDirection: 'row', alignItems: 'center'},
  deliveryAddressText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    fontSize: sR,
  },
  actualAddressText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: FLINT_STONE,
    fontSize: sR * 1.2,
  },
});

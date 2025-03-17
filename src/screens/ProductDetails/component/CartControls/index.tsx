import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AddCircle, MinusCirlce} from 'iconsax-react-native';

import HorizontalSpace from '../../../../components/HorizontalSpace';

import {hR, sR, wR} from '../../../../constants/dimensions';
import {THEME, VITAMIN_C, WHITE} from '../../../../constants/colors';
import {PROXIMA_NOVA_SEMIBOLD} from '../../../../constants/fonts';

interface CartControlsProps {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const CartControls: React.FC<CartControlsProps> = ({
  count,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity onPress={handleDecrement}>
        <MinusCirlce size={sR * 2} color={VITAMIN_C} variant='Bulk' />
      </TouchableOpacity>

      <HorizontalSpace w={2} />

      <Text style={styles.productCountText}>{count}</Text>

      <HorizontalSpace w={2} />

      <TouchableOpacity onPress={handleIncrement}>
        <AddCircle size={sR * 2} color={THEME} variant='Bulk'/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wR * 2,
    paddingVertical: hR,
    backgroundColor: WHITE,
    borderRadius: sR,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  productCountText: {
    width:sR * 1.2,
    fontSize: sR,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: THEME,
    textAlign:"center"
  },
});

export default CartControls;

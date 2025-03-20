import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import {StyleSheet} from 'react-native';

import {
  WHITE,
  THEME,
  GREY,
} from '../../../constants/colors';
import {sR} from '../../../constants/dimensions';

interface OrdersToggleProps {
  options: {label: string; value: string}[];
  onPress: (value: string) => void;
}

const OrdersToggle: React.FC<OrdersToggleProps> = ({options, onPress}) => {
  return (
    <SwitchSelector
      options={options}
      initial={0}
      selectedColor={WHITE}
      buttonColor={THEME}
      textColor={GREY}
      borderRadius={14}
      height={48}
      fontSize={sR * 1.2}
      onPress={value => onPress(value as string)}
      borderColor={WHITE}
      style={styles.switchContainer}
    />
  );
};

export default OrdersToggle;

const styles = StyleSheet.create({
  switchContainer: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
    backgroundColor: WHITE,
    borderRadius: sR * 2,
  },
});

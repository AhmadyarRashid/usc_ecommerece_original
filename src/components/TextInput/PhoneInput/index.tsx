import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { hR, sR, wR } from '../../../constants/dimensions';
import { PINBALL } from '../../../constants/colors';
import { PROXIMA_NOVA_REGULAR } from '../../../constants/fonts';

interface PhoneInputProps {
  placeholder: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={'none'}
      keyboardType={'numeric'}
    />
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
    input: {
    width: wR * 92,
    borderWidth: 1.2,
    borderColor: PINBALL,
    paddingVertical: hR * 1.6,
    paddingHorizontal: wR * 4,
    borderRadius: sR,
    fontSize: sR*1.2,
    fontFamily: PROXIMA_NOVA_REGULAR,
  },
});

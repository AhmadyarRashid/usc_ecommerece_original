import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {hR, sR, wR} from '../../../constants/dimensions';
import {BLACK, LUCKY_GREY, WHITE} from '../../../constants/colors';
import {PROXIMA_NOVA_REGULAR} from '../../../constants/fonts';

interface InputFieldProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  value: string;
  keyboardType: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  keyboardType,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={'none'}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor={LUCKY_GREY}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: wR * 92,
    paddingVertical: hR * 1.6,
    paddingHorizontal: wR * 4,
    borderRadius: sR,
    fontSize: sR * 1.2,
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: BLACK,
    backgroundColor: WHITE,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

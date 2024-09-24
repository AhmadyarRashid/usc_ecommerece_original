import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { THEME } from '../../../constants/colors';
import { sR } from '../../../constants/dimensions';
import { PROXIMA_NOVA_REGULAR } from '../../../constants/fonts';

interface InputOTPProps {
  onTextChange: (text: string) => void;
}

const InputOTP: React.FC<InputOTPProps> = ({ onTextChange }) => {
  return (
    <OtpInput
      numberOfDigits={6}
      focusColor={THEME}
      focusStickBlinkingDuration={500}
      onTextChange={onTextChange}
      textInputProps={{
        accessibilityLabel: 'One-Time Password',
      }}
      theme={{
        containerStyle: styles.container,
        pinCodeContainerStyle: styles.pinCodeContainer,
        pinCodeTextStyle: styles.pinCodeText,
      }}
    />
  );
};

export default InputOTP;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  } as ViewStyle,
  pinCodeContainer: {
    borderWidth: 2,
  } as ViewStyle,
  pinCodeText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.6,
    color: THEME,
  } as TextStyle,
});

import React from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {StyleSheet} from 'react-native';

import {THEME} from '../../../constants/colors';
import {sR} from '../../../constants/dimensions';
import {PROXIMA_NOVA_REGULAR} from '../../../constants/fonts';

const InputOTP: React.FC = () => {
  return (
    <OtpInput
      numberOfDigits={6}
      focusColor={THEME}
      focusStickBlinkingDuration={500}
      onTextChange={text => console.log(text)}
      onFilled={text => console.log(`OTP is ${text}`)}
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
  container: {justifyContent: 'space-around'},
  pinCodeContainer: {borderWidth: 2},
  pinCodeText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.6,
    color: THEME,
  },
});

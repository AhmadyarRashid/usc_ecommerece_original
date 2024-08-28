import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

import { hR, sR } from '../../../constants/dimensions';
import { THEME, WHITE } from '../../../constants/colors';
import { PROXIMA_NOVA_SEMIBOLD } from '../../../constants/fonts';
import { ButtonSize } from '../../../constants/enum';

type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';

interface SolidButtonProps {
  label: string;
  size: ButtonSizeType;
  customButtonStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
}

const SolidButton: React.FC<SolidButtonProps> = ({ label, size, customButtonStyle, customLabelStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: ButtonSize[size] }, customButtonStyle]}>
      <Text style={[styles.buttonText, customLabelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME,
    padding: hR * 2,
    borderRadius: 220,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  buttonText: {
    color: WHITE,
    fontSize: sR * 1.3,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  } as TextStyle,
});

export default SolidButton;

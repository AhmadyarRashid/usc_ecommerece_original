import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';

import {hR, sR} from '../../../constants/dimensions';
import {THEME, WHITE} from '../../../constants/colors';
import {PROXIMA_NOVA_BOLD, PROXIMA_NOVA_SEMIBOLD} from '../../../constants/fonts';
import {ButtonSize} from '../../../constants/enum';

type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';

interface SolidButtonProps {
  label: string;
  size: ButtonSizeType;
  customButtonStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const SolidButton: React.FC<SolidButtonProps> = ({
  label,
  size,
  customButtonStyle,
  customLabelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {width: ButtonSize[size]}, customButtonStyle]}>
      <Text style={[styles.buttonText, customLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME,
    paddingVertical: hR * 1.4,
    borderRadius: sR,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  buttonText: {
    color: WHITE,
    fontSize: sR * 1.4,
    fontFamily: PROXIMA_NOVA_BOLD,
  } as TextStyle,
});

export default SolidButton;

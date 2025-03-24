import React, { ReactNode } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';

import HorizontalSpace from '../../HorizontalSpace';

import {hR, sR} from '../../../constants/dimensions';
import {THEME, WHITE} from '../../../constants/colors';
import {PROXIMA_NOVA_BOLD} from '../../../constants/fonts';
import {ButtonSize} from '../../../constants/enum';

type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';

interface HollowButtonProps {
  label: string;
  size: ButtonSizeType;
  customButtonStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
}

const HollowButton: React.FC<HollowButtonProps> = ({
  label,
  size,
  customButtonStyle,
  customLabelStyle,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {width: ButtonSize[size]}, customButtonStyle]}>
      {children}

      <HorizontalSpace w={4} />

      <Text style={[styles.buttonText, customLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default HollowButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: WHITE,
    paddingVertical: hR * 1.4,
    borderRadius: sR,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: THEME,
  } as ViewStyle,
  buttonText: {
    color: THEME,
    fontSize: sR * 1.4,
    fontFamily: PROXIMA_NOVA_BOLD,
  } as TextStyle,
});

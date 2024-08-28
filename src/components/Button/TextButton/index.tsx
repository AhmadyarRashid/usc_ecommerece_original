import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TextStyle} from 'react-native';

import {THEME} from '../../../constants/colors';
import {PROXIMA_NOVA_SEMIBOLD} from '../../../constants/fonts';
import {sR} from '../../../constants/dimensions';

interface TextButtonProps {
  label: string;
  onPress?: () => void;
  customLabelStyle?: TextStyle;
}

const TextButton: React.FC<TextButtonProps> = ({
  label,
  onPress,
  customLabelStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.labelText, customLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: THEME,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.3,
  },
});

export default TextButton;

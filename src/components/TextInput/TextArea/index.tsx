import React from "react";
import { TextInput, StyleSheet } from "react-native";

import { hR, sR, wR } from "../../../constants/dimensions";
import { BLACK, LUCKY_GREY, WHITE } from "../../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../../constants/fonts";

interface TextAreaProps {
  placeholder: string;
  onChangeText: () => void;
  onBlur: () => void;
  value: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCapitalize={"none"}
      keyboardType={"numeric"}
      multiline={true}
      numberOfLines={6}
      onBlur={onBlur}
      value={value}
      placeholderTextColor={LUCKY_GREY}
    />
  );
};

export default TextArea;

const styles = StyleSheet.create({
  input: {
    width: wR * 92,
    paddingVertical: hR * 1.6,
    paddingHorizontal: wR * 4,
    borderRadius: sR,
    fontSize: sR * 1.2,
    fontFamily: PROXIMA_NOVA_REGULAR,
    height: 180,
    textAlignVertical: "top",
    color: BLACK,
    backgroundColor:WHITE,

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

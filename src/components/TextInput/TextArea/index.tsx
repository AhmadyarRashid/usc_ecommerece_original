import React from "react";
import { TextInput, StyleSheet } from "react-native";

import { hR, sR, wR } from "../../../constants/dimensions";
import { PINBALL } from "../../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../../constants/fonts";

interface TextAreaProps {
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={"none"}
      keyboardType={"numeric"}
      multiline={true}
      numberOfLines={6}
    />
  );
};

export default TextArea;

const styles = StyleSheet.create({
  input: {
    width: wR * 92,
    borderWidth: 1.2,
    borderColor: PINBALL,
    paddingVertical: hR * 1.6,
    paddingHorizontal: wR * 4,
    borderRadius: sR,
    fontSize: sR * 1.2,
    fontFamily: PROXIMA_NOVA_REGULAR,
    height: 180,
    textAlignVertical: "top",
  },
});

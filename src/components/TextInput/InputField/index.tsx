import React from "react";
import { TextInput, StyleSheet } from "react-native";

import { hR, sR, wR } from "../../../constants/dimensions";
import { PINBALL } from "../../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../../constants/fonts";

interface InputFieldProps {
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={"none"}
      keyboardType={"numeric"}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: wR * 92,
    borderWidth: 1.2,
    borderColor: PINBALL,
    paddingVertical: hR * 1.6,
    paddingHorizontal: wR * 4,
    borderRadius: 120,
    fontSize: sR * 1.2,
    fontFamily: PROXIMA_NOVA_REGULAR,
  },
});

import React from "react";
import SwitchSelector from "react-native-switch-selector";

import { BLACK, THEME, WHITE } from "../../../../constants/colors";
import { sR } from "../../../../constants/dimensions";

interface LanguageToggleProps {
  options: { label: string; value: string }[];
  onPress: (value: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ options, onPress }) => {
  return (
    <SwitchSelector
      options={options}
      initial={0}
      selectedColor={WHITE}
      buttonColor={THEME}
      textColor={BLACK}
      hasPadding
      valuePadding={2}
      height={54}
      bold
      fontSize={sR * 1.2}
      onPress={(value) => onPress(value as string)}
    />
  );
};

export default LanguageToggle;

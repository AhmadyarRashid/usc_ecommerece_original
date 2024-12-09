import { Text, View } from "react-native";

import { hR, sR, wR } from "../../../../constants/dimensions";
import { PROXIMA_NOVA_REGULAR } from "../../../../constants/fonts";
import { FLINT_STONE } from "../../../../constants/colors";

interface TextProps {
  text: string;
}

const SectionDescriptionText: React.FC<TextProps> = ({ text }) => {
  return (
    <View
      style={{
        paddingHorizontal: wR * 4,
        paddingTop: hR * 2,
        paddingBottom: hR * 4,
      }}
    >
      <Text
        style={{
          fontSize: sR * 1.2,
          fontFamily: PROXIMA_NOVA_REGULAR,
          color: FLINT_STONE,
          opacity: 0.6,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default SectionDescriptionText;

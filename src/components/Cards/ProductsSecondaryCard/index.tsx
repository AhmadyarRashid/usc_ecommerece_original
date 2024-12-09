import { ImageSourcePropType, Text, View } from "react-native";

import { hR, sR, wR } from "../../../constants/dimensions";
import { WHITE_SMOKE } from "../../../constants/colors";
import images from "../../../constants/images";
import { Image } from "react-native";

const ProductsSecondaryCard: React.FC = ({}) => {
  return (
    <View
      style={{
        paddingHorizontal: wR * 4,
        paddingVertical: hR * 2,
        borderRadius: sR,
        width: wR * 92,
        marginBottom: hR * 2,
        backgroundColor: WHITE_SMOKE,
        alignSelf: "center",
      }}
    >
      <Image
        source={images.SHAMPOO as ImageSourcePropType}
        style={{
          height: sR * 6,
          width: sR * 6,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ProductsSecondaryCard;

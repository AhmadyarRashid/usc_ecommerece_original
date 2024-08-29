import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {AddCircle} from 'iconsax-react-native';

import VerticalSpace from '../../VerticalSpace';

import images from '../../../constants/images';
import {hR, sR, wR} from '../../../constants/dimensions';
import {BLACK, THEME, WHITE_SMOKE} from '../../../constants/colors';
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../../constants/fonts';

interface ProductData {
  label: string;
  price: string;
}

interface ProductsCardProps {
  data: ProductData;
  onPress?: () => void;
}

const ProductsCard: React.FC<ProductsCardProps> = ({data,onPress}) => {
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={onPress}>
      <View style={styles.productImageContainer}>
        <Image
          source={images.SHAMPOO as ImageSourcePropType}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <VerticalSpace h={1} />

      <View style={{height: sR * 4}}>
        <Text style={styles.labelText} numberOfLines={2}>
          {data.label}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.priceText}>{data.price}</Text>

        <TouchableOpacity>
          <AddCircle size={sR * 2.6} color={THEME} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: wR * 44,
    marginRight: wR * 4,
  } as ViewStyle,
  productImageContainer: {
    backgroundColor: WHITE_SMOKE,
    alignItems: 'center',
    paddingVertical: hR * 2,
    width: wR * 44,
    borderRadius: sR,
  } as ViewStyle,
  productImage: {
    height: sR * 10,
    width: sR * 10,
  } as ImageStyle,
  labelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
    opacity: 0.6,
  } as TextStyle,
  priceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  } as TextStyle,
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
});

export default ProductsCard;

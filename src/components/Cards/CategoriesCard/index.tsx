import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';

import {hR, sR, wR} from '../../../constants/dimensions';
import {
  BLACK,
  FLINT_STONE,
} from '../../../constants/colors';
import images from '../../../constants/images';
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../../constants/fonts';

interface CategoryData {
  label: string;
  category: string;
  borderColor?: string;
  bgColor?: string;
}

interface CategoriesCardProps {
  data: CategoryData;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({data}) => {
  return (
    <View
      style={[
        styles.rootContainer,
        {
          borderColor: data.borderColor,
          backgroundColor: data.bgColor,
        },
      ]}>
      <Text style={styles.labelText}>{data.label}</Text>
      <Text style={styles.categoryText}>{data.category}</Text>
      <Image
        source={images.FRUITS as ImageSourcePropType}
        style={styles.categoryImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderRadius: sR,
    marginRight: wR * 2,
    paddingHorizontal: wR * 4,
    paddingTop: hR * 2,
  } as ViewStyle,
  labelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.3,
    color: BLACK,
  } as TextStyle,
  categoryText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR*1.1,
    color: FLINT_STONE,
    opacity: 0.6,
  } as TextStyle,
  categoryImage: {
    height: sR * 8,
    width: sR * 8,
    alignSelf: 'center',
  } as ImageStyle,
});

export default CategoriesCard;

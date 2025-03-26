import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AddCircle, MinusCirlce} from 'iconsax-react-native';
import {useDispatch} from 'react-redux';

import HorizontalSpace from '../../HorizontalSpace';
import VerticalSpace from '../../VerticalSpace';

import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../../constants/fonts';
import {
  BLACK,
  FLINT_STONE,
  THEME,
  VITAMIN_C,
  WHITE,
  WHITE_SMOKE,
} from '../../../constants/colors';
import {hR, sR, wR} from '../../../constants/dimensions';
import images from '../../../constants/images';
import useDynamicSliceSelector from '../../../hooks/useDynamicSliceSelector';
import {setCartFields} from '../../../redux/slices/cart';
import {addToCart, removeFromCart} from '../../../constants/functions';
interface CartItemCardProps {
  data: {
    id: number;
    name: string;
    list_price: string | number;
    count: number;
  };
}

const CartItemCard: React.FC<CartItemCardProps> = ({data}) => {
  const {cart} = useDynamicSliceSelector(['cart']);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(setCartFields({cartList: addToCart(cart?.cartList, data?.id)}));
  };

  const handleRemoveFromCart = () => {
    dispatch(
      setCartFields({cartList: removeFromCart(cart?.cartList, data?.id)}),
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.productImageContainer}>
          <Image
            source={images.SHAMPOO}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <HorizontalSpace w={2} />

        <View style={styles.productDetails}>
          <Text style={styles.productNameText} numberOfLines={2}>
            {data.name}
          </Text>

          <VerticalSpace h={0.6} />

          <View style={styles.productCostContainer}>
            <Text style={styles.discountedPriceText}>{data.list_price}</Text>
            <HorizontalSpace w={2} />
            <Text style={styles.originalPriceText}>{data.list_price}</Text>
          </View>

          <VerticalSpace h={0.6} />

          <Text style={styles.qtyText}>{data.count}x Items</Text>
        </View>
      </View>

      <HorizontalSpace w={2} />

      <View style={styles.countContainer}>
        <TouchableOpacity onPress={handleAddToCart}>
          <AddCircle size={sR * 2} color={THEME} variant="Bold" />
        </TouchableOpacity>

        <VerticalSpace h={1} />

        <Text style={styles.countText}>{data.count}</Text>

        <VerticalSpace h={1} />

        <TouchableOpacity onPress={handleRemoveFromCart}>
          <MinusCirlce size={sR * 2} color={VITAMIN_C} variant="Bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: sR,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    width: wR * 92,
    marginBottom: hR * 2,
    backgroundColor: WHITE,

    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  productImageContainer: {
    backgroundColor: WHITE_SMOKE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: sR,
    borderRadius: sR,
  },
  productImage: {
    height: sR * 4,
    width: sR * 4,
  },
  productDetails: {
    flexShrink: 1,
  },
  productNameText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  productCostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: THEME,
  },
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: 'line-through',
  },
  qtyText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  countText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR,
    color: BLACK,
  },
  countContainer: {
    alignItems: 'center',
    paddingVertical: hR,
    paddingHorizontal: wR * 2,
    backgroundColor: WHITE,
    borderRadius: sR,

    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

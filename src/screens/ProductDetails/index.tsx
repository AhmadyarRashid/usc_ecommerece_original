import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {isUndefined} from 'lodash';
import {useTranslation} from 'react-i18next';

import HeaderPrimary from '../../components/Header/HeaderPrimary';
import VerticalSpace from '../../components/VerticalSpace';
import HorizontalSpace from '../../components/HorizontalSpace';
import HorizontalLine from '../../components/HorizontalLine';
import CartControls from './component/CartControls';

import {
  BLACK,
  FLINT_STONE,
  HULK,
  THEME,
  VITAMIN_C,
  WHITE,
} from '../../constants/colors';
import images from '../../constants/images';
import {hR, sR, wR} from '../../constants/dimensions';
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../constants/fonts';
import {
  AppNavigationProps,
  StackParamList,
} from '../../constants/navigationTypes';
import {RootState} from '../../redux/store';
import {setCartFields} from '../../redux/slices/cart';
import {displayToast} from '../../constants/functions';
import {createDynamicSelector} from '../../redux/selectors';
import {Star1} from 'iconsax-react-native';
import SolidButton from '../../components/Button/SolidButton';

type ProductDetailsRouteProp = RouteProp<StackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute<ProductDetailsRouteProp>();
  const selectAuthAddressOrder = createDynamicSelector([
    'product',
    'cart',
  ] as const);
  const {product, cart} = useSelector((state: RootState) =>
    selectAuthAddressOrder(state),
  );
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [count, setCount] = useState(1);

  const productList = route?.params?.arrayToSearch
    ? product?.searchedProductList
    : product?.productList;

  const productByID = productList?.find(
    item => item.id === route?.params?.productID,
  );

  const addToCart = () => {
    if (!productByID) {
      displayToast({
        type: 'error',
        text1: 'Error',
        text2: `Product not found!`,
      });

      return;
    }

    const existingItem = cart.cartList.find(item => item.id === productByID.id);

    const newCount = existingItem ? existingItem.count + count : count;

    // if (newCount > productByID.qty_available) {
    //   displayToast({
    //     type: "error",
    //     text1: "Error",
    //     text2: `Cannot add more than available quantity!`,
    //   });
    //   return;
    // }

    const updatedCartList = existingItem
      ? cart.cartList.map(item =>
          item.id === productByID.id ? {...item, count: newCount} : item,
        )
      : [...cart.cartList, {...productByID, count}];

    dispatch(setCartFields({cartList: updatedCartList}));

    displayToast({
      type: 'success',
      text1: 'Success',
      text2: existingItem
        ? `Item count updated in your cart!`
        : `Item successfully added to your cart!`,
    });
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!productByID) {
    return (
      <View style={styles.rootContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary
        label={t(`PRODUCT_DETAILS.PRODUCT_DETAILS`)}
        onPress={goBack}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.childContainer}>
          <VerticalSpace h={2} />

          <Image
            source={
              // productByID.image_128
              //   ? { uri: productByID.image_128 }
              //   : images.COFFEE
              images.COFFEE
            }
            style={styles.productImage}
          />

          <VerticalSpace h={4} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: sR * 1.4,
                  fontWeight: '500',
                }}>
                {productByID.name}
              </Text>

              <Text
                style={{
                  fontSize: sR * 1.4,
                  fontWeight: '500',
                }}>
                PKR {productByID.list_price}
              </Text>
            </View>

            <CartControls
              count={count}
              handleIncrement={() => setCount(prev => prev + 1)}
              handleDecrement={() => setCount(prev => Math.max(prev - 1, 1))}
            />
          </View>

          <VerticalSpace h={2} />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {[...Array(5)].map((item, index) => (
              <Star1 size={sR * 1.6} color={THEME} variant="Bold" />
            ))}

            <HorizontalSpace w={2} />

            <Text
              style={{
                fontSize: sR * 1.2,
              }}>
              4.0 (146 Reviews)
            </Text>
          </View>

          <VerticalSpace h={2} />

          <HorizontalLine />

          <VerticalSpace h={2} />

          <Text style={styles.productAvailabilityText}>
            {productByID.qty_available > 0
              ? t(`PRODUCT_DETAILS.AVAILABLE_IN_STOCK`)
              : t(`PRODUCT_DETAILS.OUT_OF_STOCK`)}
          </Text>

          <VerticalSpace h={2} />

          <Text style={styles.productInfoText}>N/A</Text>
        </View>
      </ScrollView>

      <SolidButton label={`Add to cart`} customButtonStyle={{width:wR*92,alignSelf:"center"}} onPress={addToCart}/>

      <VerticalSpace h={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  childContainer: {
    paddingHorizontal: wR * 4,
    paddingBottom: hR * 12,
  },
  productImage: {
    width: wR * 92,
    height: hR * 20,
    borderRadius: sR,
    resizeMode: 'cover',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  productLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  priceAndAvailabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    fontSize: sR * 1.6,
    color: BLACK,
  },
  originalPriceText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    textDecorationLine: 'line-through',
  },
  productAvailabilityText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: VITAMIN_C,
    alignSelf: 'flex-end',
  },
  productInfoHeadingText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  productInfoText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

export default ProductDetailsScreen;

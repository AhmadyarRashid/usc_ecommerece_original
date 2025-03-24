import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

import HorizontalSpace from '../../../HorizontalSpace';
import HorizontalLine from '../../../HorizontalLine';
import VerticalSpace from '../../../VerticalSpace';
import Rating from '../../../Rating';
import SolidButton from '../../../Button/SolidButton';

import {BLACK, GREY, THEME, WHITE} from '../../../../constants/colors';
import {hR, sR, wR} from '../../../../constants/dimensions';
import images from '../../../../constants/images';

const PreviousOrders = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <View style={styles.imageContainer}>
            <Image source={images.SHAMPOO} style={styles.image} />
          </View>

          <HorizontalSpace w={4} />

          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderIdText}>#2786903578</Text>

            <Text style={styles.orderOtherDetailsText}>
              245, I-8/3, Islamabad
            </Text>

            <Text style={styles.orderOtherDetailsText}>2 Items</Text>
          </View>
        </View>

        <View style={styles.orderStatusContainer}>
          <Text style={styles.orderStatusText}>Delivered</Text>
        </View>
      </View>

      <VerticalSpace h={2} />

      <HorizontalLine />

      <VerticalSpace h={1} />

      <View style={styles.middleContainer}>
        <Text style={styles.orderDateTimeText}>10 Apr 2024 at 07:45 PM</Text>

        <Text style={styles.orderPriceText}>PKR 1050</Text>
      </View>

      <VerticalSpace h={1} />

      <HorizontalLine />

      <VerticalSpace h={2} />

      <View style={styles.bottomContainer}>
        <Rating />

        <SolidButton
          label="Reorder"
          size="sm"
          customLabelStyle={{fontSize: sR * 1.2}}
          customButtonStyle={{paddingVertical: hR}}
        />
      </View>
    </View>
  );
};

export default PreviousOrders;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: WHITE,
    width: wR * 92,
    borderRadius: sR,
    marginVertical:hR*2,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,

    paddingVertical: hR,
    paddingHorizontal: wR * 2,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: WHITE,
    paddingVertical: hR,
    paddingHorizontal: wR,
    borderRadius: sR,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  image: {
    height: sR * 6,
    width: sR * 6,
    resizeMode: 'contain',
  },
  orderDetailsContainer: {
    height: sR * 6,
    justifyContent: 'space-around',
  },
  orderIdText: {
    fontSize: sR * 1.2,
    fontWeight: 'bold',
  },
  orderOtherDetailsText: {
    color: GREY,
    fontSize: sR,
  },
  orderStatusContainer: {
    paddingHorizontal: wR * 6,
    height: hR * 3,
    justifyContent: 'center',
    borderRadius: sR,
    backgroundColor: WHITE,

    shadowColor: THEME,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  orderStatusText: {
    color: GREY,
    fontSize: sR,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wR * 4,
  },
  orderDateTimeText: {
    color: GREY,
    fontSize: sR * 1.2,
  },
  orderPriceText: {
    color: BLACK,
    fontSize: sR * 1.2,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

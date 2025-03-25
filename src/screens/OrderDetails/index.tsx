import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {MessageQuestion} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AxiosRequestHeaders} from 'axios';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {useTranslation} from 'react-i18next';

import HeaderPrimary from '../../components/Header/HeaderPrimary';
import VerticalSpace from '../../components/VerticalSpace';
import HorizontalLine from '../../components/HorizontalLine';
import CompaintModal from '../../components/Modals/ComplaintModal';
import Loader from '../../components/Loader';
import SolidButton from '../../components/Button/SolidButton';

import {
  ALBESCENT_WHITE,
  BLACK,
  EPHEMERAL_MIST,
  FLINT_STONE,
  ORCA_WHITE,
  PRELUDE,
  WHITE,
  WHITE_SMOKE,
} from '../../constants/colors';
import {hR, sR, wR} from '../../constants/dimensions';
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from '../../constants/fonts';
import useToggle from '../../hooks/useToggle';
import {AppNavigationProps} from '../../constants/navigationTypes';
import useApiHook from '../../hooks/rest/useApi';
import useDynamicSliceSelector from '../../hooks/useDynamicSliceSelector';
import {displayToast} from '../../constants/functions';

type RouteParams = {
  orderID: number;
};

const colors = [PRELUDE, ORCA_WHITE, EPHEMERAL_MIST, ALBESCENT_WHITE];

const OrderDetailsScreen: React.FC = () => {
  // const route = useRoute();
  // const {handleRestApi, restApiLoading} = useApiHook();
  // const {auth} = useDynamicSliceSelector(['auth']);
  // const ORDER_ID = (route?.params as RouteParams)?.orderID;
  // const [complaintModal, toggleComplaintModal] = useToggle(false);

  // const [orderDetails, setOrderDetails] = useState({});

  // // const itemTotal = PRODUCT_LIST.reduce(
  // //   (acc, item) => acc + item.unitPrice * parseInt(item.qty, 10),
  // //   0
  // // );
  // // const tax = itemTotal * 0.05;
  // // const markdown = 200;
  // // const aggregateTotal = itemTotal + tax - markdown;

  // useEffect(() => {
  //   getOrderDetails();
  // }, []);

  // const getOrderDetails = async () => {
  //   const data = {
  //     auth_token: auth.accessToken,
  //     login: auth.userName,
  //     orderID: ORDER_ID,
  //   };

  //   const response = await handleRestApi({
  //     method: 'post',
  //     url: 'order_view',
  //     data,
  //     headers: {Authorization: 'none'} as AxiosRequestHeaders,
  //   });

  //   if (response?.data?.result?.status === 200) {
  //     setOrderDetails(response?.data?.result?.order);
  //   }
  // };

  // const cancelOrder = async () => {
  //   const data = {
  //     auth_token: auth.accessToken,
  //     login: auth.userName,
  //     orderID: ORDER_ID,
  //   };

  //   const response = await handleRestApi({
  //     method: 'post',
  //     url: 'order_cancel',
  //     data,
  //     headers: {Authorization: 'none'} as AxiosRequestHeaders,
  //   });

  //   if (response?.data?.result?.status === 200) {
  //     displayToast({
  //       type: 'success',
  //       text1: 'Success',
  //       text2: `Your order has been canceled successfully!`,
  //     });

  //     setTimeout(() => {
  //       goBack();
  //     }, 1000);
  //   }
  // };

  const {t} = useTranslation();
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={`Order Details`} onPress={goBack} />

      <ScrollView>
        <VerticalSpace h={2} />

        <Text style={styles.orderNumberText}>Orders # 9653892</Text>

        <VerticalSpace h={2} />

        <View style={styles.shipmentDetailsContainer}>
          <Text style={styles.orderDateAndTimeText}>
            Pending , 20 Feb 2025 at 03:45 PM
          </Text>

          <VerticalSpace h={1} />

          <Text style={styles.shipmentDetailsBoldText}>Order From</Text>

          <VerticalSpace h={1} />

          <Text style={styles.shipmentDetailsNormalText}>
            Utility Stores Corporation, G-9 Markaz, Islamabad
          </Text>

          <VerticalSpace h={1} />

          <Text style={styles.shipmentDetailsBoldText}>Order To</Text>

          <VerticalSpace h={1} />

          <Text style={styles.shipmentDetailsNormalText}>
            House # 412, street 45, I-8/3, Islamabad
          </Text>
        </View>

        <VerticalSpace h={2} />

        <View style={styles.lineContainer}>
          <HorizontalLine />
        </View>

        <VerticalSpace h={2} />

        <View
          style={{
            paddingHorizontal: wR * 4,
          }}>
          <View style={styles.tableRowContainer}>
            <View style={styles.tableCellContainer}>
              <Text style={styles.tableLabelText}>Product</Text>
            </View>

            <View style={styles.tableCellContainer}>
              <Text style={styles.tableLabelText}>Quantity</Text>
            </View>

            <View style={styles.tableCellContainer}>
              <Text style={styles.tableLabelText}>Unit Price</Text>
            </View>

            <View style={styles.tableCellContainer}>
              <Text style={styles.tableLabelText}>Price (PKR)</Text>
            </View>
          </View>

          {!isEmpty([...Array(8)]) &&
            // orderDetails?.productList.map((item, index) => {
            [...Array(8)].map((item, index) => {
              const backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <View
                  // key={`${item.name}-${index}`}
                  key={`${index}`}
                  style={{
                    ...styles.tableRowContainer,
                    backgroundColor: backgroundColor,
                  }}>
                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>
                      {/* {item.name} */}
                      Atta Chakki
                    </Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>
                      {/* {item.quantity} */}
                      12
                    </Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>
                      {/* {item.unitPrice} */}
                      1200.00
                    </Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>
                      {/* {(item.unitPrice * parseInt(item.qty, 10)).toString()} */}
                      {/* {item?.totalPrice} */}
                      5000.00
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <VerticalSpace h={2} />

        <View style={styles.lineContainer}>
          <HorizontalLine />
        </View>

        <VerticalSpace h={2} />

        <View style={{paddingHorizontal: wR * 4}}>
          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Goods & Services Tax (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {/* {orderDetails?.totalTaxes} */}
              5000.00 PKR
            </Text>
          </View>

          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Total Price (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {/* {orderDetails?.totalAmount} */}
              12000.00 PKR
            </Text>
          </View>
        </View>

        <VerticalSpace h={2} />

        <SolidButton
          label="Cancel Order"
          size="xl"
          customButtonStyle={{alignSelf: 'center'}}
        />

        <VerticalSpace h={4} />
      </ScrollView>
    </View>
  );

  {
    /* <View style={styles.feedbackContainer}>
        <Text style={styles.howIsOrderText}>How is your order?</Text>

        <Text style={styles.takeMomentToRateText}>
          Please take a moment to rate...
        </Text>

        <VerticalSpace h={2} />

        <Rating
          type="custom"
          ratingCount={5}
          imageSize={32}
          showRating={true}
        />
      </View> */
  }
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  orderNumberText: {
    alignSelf: 'center',
    fontSize: sR * 1.3,
    fontWeight: '500',
  },
  shipmentDetailsContainer: {
    width: wR * 92,
    backgroundColor: WHITE,
    alignSelf: 'center',
    borderRadius: sR,
    paddingVertical: hR * 2,
    paddingHorizontal: wR * 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  orderDateAndTimeText: {
    alignSelf: 'center',
    fontSize: sR,
    color: BLACK,
  },
  shipmentDetailsBoldText: {
    fontSize: sR * 1.2,
    color: BLACK,
    fontWeight: '600',
  },
  shipmentDetailsNormalText: {
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.8,
    marginLeft: wR * 4,
  },
  tableCellContainer: {
    width: '25%',
  },
  tableLabelText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  tableRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hR * 2,
    paddingLeft: wR * 2,
    borderRadius: sR,
    marginBottom: hR,
  },
  tableValueText: {
    fontSize: sR * 1.2,
    color: BLACK,
  },
  lineContainer: {width: wR * 92, alignSelf: 'center'},
  orderSecondaryInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hR,
  },
  orderSecondaryInfoLabelText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  orderSecondaryInfoValueText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.3,
    color: BLACK,
  },
  // feedbackContainer: {
  //   alignItems: 'center',
  // },
  // howIsOrderText: {
  //   fontFamily: PROXIMA_NOVA_SEMIBOLD,
  //   fontSize: sR * 1.4,
  //   color: BLACK,
  // },
  // takeMomentToRateText: {
  //   fontFamily: PROXIMA_NOVA_REGULAR,
  //   fontSize: sR * 1.2,
  //   color: FLINT_STONE,
  //   opacity: 0.6,
  // },
});

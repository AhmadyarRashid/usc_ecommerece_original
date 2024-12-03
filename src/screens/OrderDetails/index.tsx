import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { MessageQuestion } from "iconsax-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AxiosRequestHeaders } from "axios";
import moment from "moment";
import { isEmpty } from "lodash";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import HorizontalLine from "../../components/HorizontalLine";
import CompaintModal from "../../components/Modals/ComplaintModal";
import Loader from "../../components/Loader";
import SolidButton from "../../components/Button/SolidButton";

import {
  ALBESCENT_WHITE,
  BLACK,
  EPHEMERAL_MIST,
  FLINT_STONE,
  ORCA_WHITE,
  PRELUDE,
  WHITE,
  WHITE_SMOKE,
} from "../../constants/colors";
import { hR, sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import useToggle from "../../hooks/useToggle";
import { AppNavigationProps } from "../../constants/navigationTypes";
import useApiHook from "../../hooks/rest/useApi";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import { displayToast } from "../../constants/functions";

type RouteParams = {
  orderID: number;
};

const colors = [PRELUDE, ORCA_WHITE, EPHEMERAL_MIST, ALBESCENT_WHITE];

const OrderDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute();
  const { handleRestApi, restApiLoading } = useApiHook();
  const { auth } = useDynamicSliceSelector(["auth"]);
  const ORDER_ID = (route?.params as RouteParams)?.orderID;
  const [complaintModal, toggleComplaintModal] = useToggle(false);

  const [orderDetails, setOrderDetails] = useState({});

  // const itemTotal = PRODUCT_LIST.reduce(
  //   (acc, item) => acc + item.unitPrice * parseInt(item.qty, 10),
  //   0
  // );
  // const tax = itemTotal * 0.05;
  // const markdown = 200;
  // const aggregateTotal = itemTotal + tax - markdown;

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      orderID: ORDER_ID,
    };

    const response = await handleRestApi({
      method: "post",
      url: "order_view",
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.status === 200) {
      setOrderDetails(response?.data?.result?.order);
    }
  };

  const cancelOrder = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      orderID: ORDER_ID,
    };

    const response = await handleRestApi({
      method: "post",
      url: "order_cancel",
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.status === 200) {
      displayToast({
        type: "success",
        text1: "Success",
        text2: `Your order has been canceled successfully!`,
      });

      setTimeout(()=>{
        goBack()
      },1000)
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <CompaintModal
        isVisible={complaintModal}
        onClose={toggleComplaintModal}
      />

      <HeaderPrimary label="Order Details" onPress={goBack}>
        <TouchableOpacity onPress={toggleComplaintModal}>
          <MessageQuestion size={sR * 2} color={BLACK} variant="Bold" />
        </TouchableOpacity>
      </HeaderPrimary>

      <VerticalSpace h={2} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.orderPrimaryInfoContainer}>
          <Text style={styles.orderNoText}>
            Order #{orderDetails?.orderNumber}
          </Text>

          <Text style={styles.dateDeliveredText}>
            Delivered on {moment(orderDetails?.date).format("LLL")}
          </Text>

          <VerticalSpace h={2} />

          <View>
            <View>
              <Text style={styles.addressLabelText}>Order from</Text>
              <Text style={styles.addressValueText}>
                Utility Stores Corporation Head Office, G-9 Markaz G 9 Markaz
                G-9, Islamabad, Islamabad Capital Territory
              </Text>
            </View>

            <VerticalSpace h={2} />

            <View>
              <Text style={styles.addressLabelText}>Delivered to</Text>
              <Text style={styles.addressValueText}>
                {orderDetails?.deliveryAddress?.name},
                {orderDetails?.deliveryAddress?.street},
                {orderDetails?.deliveryAddress?.city}
              </Text>
            </View>
          </View>
        </View>

        <VerticalSpace h={2} />

        <HorizontalLine />

        <VerticalSpace h={2} />

        <View>
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

          {!isEmpty(orderDetails?.productList) &&
            orderDetails?.productList.map((item, index) => {
              const backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <View
                  key={`${item.name}-${index}`}
                  style={{
                    ...styles.tableRowContainer,
                    backgroundColor: backgroundColor,
                  }}
                >
                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>{item.name}</Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>{item.quantity}</Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>{item.unitPrice}</Text>
                  </View>

                  <View style={styles.tableCellContainer}>
                    <Text style={styles.tableValueText}>
                      {/* {(item.unitPrice * parseInt(item.qty, 10)).toString()} */}
                      {item?.totalPrice}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <VerticalSpace h={2} />

        <HorizontalLine />

        <VerticalSpace h={2} />

        <View>
          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Goods & Services Tax (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {orderDetails?.totalTaxes}
            </Text>
          </View>

          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Total Price (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {orderDetails?.totalAmount}
            </Text>
          </View>
        </View>

        <VerticalSpace h={2} />

        <HorizontalLine />

        <VerticalSpace h={2} />

        <SolidButton label="Cancel Order" onPress={cancelOrder} />

        {/* <View style={styles.feedbackContainer}>
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
        </View> */}

        <VerticalSpace h={2} />
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollViewContainer: {
    paddingHorizontal: wR * 4,
  },
  orderPrimaryInfoContainer: {
    backgroundColor: WHITE_SMOKE,
    borderRadius: sR,
    padding: sR * 2,
  },
  orderNoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.6,
    color: BLACK,
    alignSelf: "center",
  },
  dateDeliveredText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    alignSelf: "center",
    opacity: 0.6,
  },
  addressLabelText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  addressValueText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  tableCellContainer: {
    width: "25%",
  },
  tableLabelText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  tableRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hR * 2,
    paddingLeft: wR * 2,
    borderRadius: sR,
    marginBottom: hR,
  },
  tableValueText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  orderSecondaryInfoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  feedbackContainer: {
    alignItems: "center",
  },
  howIsOrderText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  takeMomentToRateText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
});

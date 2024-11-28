import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { isNull } from "lodash";

import VerticalSpace from "../../../../components/VerticalSpace";
import SolidButton from "../../../../components/Button/SolidButton";
import HorizontalLine from "../../../../components/HorizontalLine";

import {
  BLACK,
  FLINT_STONE,
  THEME,
  WHITE_SMOKE,
} from "../../../../constants/colors";
import { hR, sR, wR } from "../../../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../../constants/fonts";
import useDynamicSliceSelector from "../../../../hooks/useDynamicSliceSelector";
import { calculateOrderCost } from "../../../../constants/functions";

interface ShoppingCartListFooterProps {
  onProceedCheckoutPress: () => void;
  onPlaceOrderPress: () => void;
}

const ReceiptItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.recieptItemContainer}>
    <Text style={styles.recieptItemLeftText}>{label}</Text>
    <Text style={styles.recieptItemRightText}>{value} PKR</Text>
  </View>
);

const ShoppingCartListFooter: React.FC<ShoppingCartListFooterProps> = ({
  onProceedCheckoutPress,
  onPlaceOrderPress,
}) => {
  const { cart, address } = useDynamicSliceSelector(["cart", "address"]);
  const { subtotal, standardDelivery, platformFees, vat, grandTotal } =
    calculateOrderCost(cart?.cartList);

  const isAddressSelected = !isNull(address?.selectedAddress);
  const buttonLabel = isAddressSelected ? "Place Order" : "Proceed to Checkout";
  const buttonAction = isAddressSelected
    ? onPlaceOrderPress
    : onProceedCheckoutPress;

  return (
    <View>
      <VerticalSpace h={2} />

      <View style={styles.receiptInfoContainer}>
        {cart?.cartList.map((item, index) => (
          <View key={index}>
            <ReceiptItem
              label={`${item?.name + 1} (${item?.count}x)`}
              value={item?.list_price * item?.count}
            />
            <VerticalSpace h={1} />
          </View>
        ))}

        <HorizontalLine />

        <VerticalSpace h={1} />

        <ReceiptItem label="Subtotal" value={subtotal} />

        <VerticalSpace h={1} />
        
        <ReceiptItem label="Standard Delivery" value={standardDelivery} />
        
        <VerticalSpace h={1} />
        
        <ReceiptItem label="Platform Fees" value={platformFees} />
        
        <VerticalSpace h={1} />
        
        <ReceiptItem label="VAT" value={vat} />
        
        <VerticalSpace h={2} />

        <HorizontalLine />
        
        <VerticalSpace h={2} />

        <View style={styles.recieptItemContainer}>
          <Text style={[styles.recieptItemLeftText, styles.boldText]}>
            Grand Total
          </Text>
          <Text style={[styles.recieptItemRightText, styles.boldText]}>
            {grandTotal} PKR
          </Text>
        </View>

        <VerticalSpace h={1} />
        <Text style={styles.infoText}>
          Note! This outlet doesn't accept vouchers.
        </Text>
      </View>

      <VerticalSpace h={2} />

      <View style={styles.discountInfoContainer}>
        <Text style={styles.infoText}>
          Enjoy a reduced delivery fee of PKR 100, down from PKR 200!
        </Text>
      </View>

      <VerticalSpace h={2} />

      <SolidButton label={buttonLabel} size="xl" onPress={buttonAction} />
    </View>
  );
};

export default ShoppingCartListFooter;

const styles = StyleSheet.create({
  receiptInfoContainer: {
    borderRadius: sR,
    backgroundColor: WHITE_SMOKE,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
  } as ViewStyle,

  recieptItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width:'100%'
  } as ViewStyle,

  recieptItemLeftText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
    width:'60%'

  } as TextStyle,

  recieptItemRightText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    width:'40%',
    textAlign:"right",
  } as TextStyle,

  boldText: {
    fontSize: sR * 1.6,
  } as TextStyle,

  discountInfoContainer: {
    borderRadius: sR,
    backgroundColor: WHITE_SMOKE,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
  } as ViewStyle,

  infoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: THEME,
    fontSize: sR * 1.2,
  } as TextStyle,
});

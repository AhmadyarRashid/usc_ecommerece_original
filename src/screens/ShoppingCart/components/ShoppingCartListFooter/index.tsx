import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { isNull } from "lodash";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const isAddressSelected = !isNull(address?.selectedAddress);
  const buttonLabel = isAddressSelected
    ? t(`SHOPPING_CART.PLACE_ORDER`)
    : t(`SHOPPING_CART.PROCEED_TO_CHECKOUT`);
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

        <ReceiptItem label={t(`SHOPPING_CART.SUBTOTAL`)} value={subtotal} />

        <VerticalSpace h={1} />

        <ReceiptItem
          label={t(`SHOPPING_CART.STANDARD_DELIVERY`)}
          value={standardDelivery}
        />

        <VerticalSpace h={1} />

        <ReceiptItem
          label={t(`SHOPPING_CART.PLATFORM_FEES`)}
          value={platformFees}
        />

        <VerticalSpace h={1} />

        <ReceiptItem label={t(`SHOPPING_CART.VAT`)} value={vat} />

        <VerticalSpace h={2} />

        <HorizontalLine />

        <VerticalSpace h={2} />

        <View style={styles.recieptItemContainer}>
          <Text style={[styles.recieptItemLeftText, styles.boldText]}>
            {t(`SHOPPING_CART.GRAND_TOTAL`)}
          </Text>
          <Text style={[styles.recieptItemRightText, styles.boldText]}>
            {grandTotal} PKR
          </Text>
        </View>

        <VerticalSpace h={1} />
        <Text style={styles.infoText}>
          {t(`SHOPPING_CART.NO_VOUCHERS_NOTE`)}
        </Text>
      </View>

      <VerticalSpace h={2} />

      <View style={styles.discountInfoContainer}>
        <Text style={styles.infoText}>
          {t(`SHOPPING_CART.DELIVERY_DISCOUNT`)}
        </Text>
      </View>

      <VerticalSpace h={2} />

      <SolidButton label={buttonLabel} size="xl" onPress={buttonAction} />

      {Platform.OS === "android" && <VerticalSpace h={2} />}
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
    width: "100%",
  } as ViewStyle,

  recieptItemLeftText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
    width: "60%",
  } as TextStyle,

  recieptItemRightText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
    width: "40%",
    textAlign: "right",
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

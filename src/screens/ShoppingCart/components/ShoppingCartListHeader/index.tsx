import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Location } from "iconsax-react-native";
import { isNull } from "lodash";

import VerticalSpace from "../../../../components/VerticalSpace";
import HorizontalSpace from "../../../../components/HorizontalSpace";
import TextButton from "../../../../components/Button/TextButton";

import {
  AMBROSIA_IVORY,
  BLACK,
  BUCKTHORN_BROWN,
  SAND_MUFFIN,
  THEME,
} from "../../../../constants/colors";
import { hR, sR, wR } from "../../../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../../constants/fonts";
import useDynamicSliceSelector from "../../../../hooks/useDynamicSliceSelector";

interface ShoppingCartListHeaderProps {
  onEditPress: () => void;
}

const ShoppingCartListHeader: React.FC<ShoppingCartListHeaderProps> = ({
  onEditPress,
}) => {
  const { address } = useDynamicSliceSelector(["address"]);

  const { name = "", street = "", city = "" } = address?.selectedAddress || {};

  return (
    <View>
      <VerticalSpace h={2} />

      <View style={styles.primaryInfoContainer}>
        <Text style={styles.primaryInfoText}>
          Discounts have been automatically applied to all of your shopping
          items. Enjoy your savings on every purchase!
        </Text>
      </View>

      <VerticalSpace h={2} />

      {isNull(address?.selectedAddress) ? null : (
        <>
          <Text style={styles.headingText}>Delivery Address</Text>

          <VerticalSpace h={2} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.deliveryAddressContainer}>
              <Location size={sR * 2.6} color={THEME} variant="Bulk" />

              <HorizontalSpace w={2} />

              <View>
                <Text style={styles.deliveryAddressLabelText}>{name}</Text>

                <Text style={styles.deliveryAddressValueText}>
                  {street}, {city}
                </Text>
              </View>
            </View>

            <TextButton label={`Adjust`} onPress={onEditPress} />
          </View>

          <VerticalSpace h={2} />
        </>
      )}

      <Text style={styles.headingText}>My Orders</Text>

      <VerticalSpace h={2} />
    </View>
  );
};

export default ShoppingCartListHeader;

const styles = StyleSheet.create({
  primaryInfoContainer: {
    borderWidth: 1,
    borderColor: SAND_MUFFIN,
    borderRadius: sR,
    backgroundColor: AMBROSIA_IVORY,
    flexDirection: "row",
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    alignItems: "center",
  } as ViewStyle,

  primaryInfoText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: BUCKTHORN_BROWN,
    fontSize: sR * 1.2,
  } as TextStyle,

  headingText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.4,
  } as TextStyle,

  deliveryAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  deliveryAddressLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  } as TextStyle,

  deliveryAddressValueText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.4,
    color: BLACK,
  },
});

import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import VerticalSpace from "../../../../components/VerticalSpace";

import {
  AMBROSIA_IVORY,
  BLACK,
  BUCKTHORN_BROWN,
  SAND_MUFFIN,
} from "../../../../constants/colors";
import { hR, sR, wR } from "../../../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../../constants/fonts";

const ShoppingCartListHeader: React.FC = () => {
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
});

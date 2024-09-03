import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HorizontalSpace from "../../HorizontalSpace";
import VerticalSpace from "../../VerticalSpace";
import HorizontalLine from "../../HorizontalLine";
import SolidButton from "../../Button/SolidButton";

import {
  BLACK,
  FLINT_STONE,
  PINBALL,
  THEME,
  WHITE,
  WHITE_SMOKE,
} from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import images from "../../../constants/images";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";

interface OrdersCardProps {
  onPress?: () => void;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={onPress}>
      <View style={styles.orderPrimaryInfoContainer}>
        <View style={styles.orderImageContainer}>
          <Image
            source={images.SHAMPOO}
            style={styles.orderImage}
            resizeMode="contain"
          />
        </View>

        <HorizontalSpace w={4} />

        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.orderNoAndStatusContainer}>
            <Text style={styles.orderNoText}>Order #s7ro-34-di98</Text>

            <View style={styles.orderStatusContainer}>
              <Text style={styles.orderStatusText}>Delivered</Text>
            </View>
          </View>

          <VerticalSpace h={1} />

          <Text style={styles.orderDateTimeText}>January 24, 2024 | 20:40</Text>
        </View>
      </View>

      <VerticalSpace h={2} />

      <View style={styles.orderSecondaryInfoContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.orderSecondaryInfoLabelText}>Quality Score</Text>

          <VerticalSpace h={1} />

          <Text style={styles.orderSecondaryInfoValueText}>5</Text>
        </View>

        <View style={styles.verticalLine} />

        <View style={{ alignItems: "center" }}>
          <Text style={styles.orderSecondaryInfoLabelText}>Goods</Text>

          <VerticalSpace h={1} />

          <Text style={styles.orderSecondaryInfoValueText}>12+</Text>
        </View>

        <View style={styles.verticalLine} />

        <View style={{ alignItems: "center" }}>
          <Text style={styles.orderSecondaryInfoLabelText}>Amount (PKR)</Text>

          <VerticalSpace h={1} />

          <Text style={styles.orderSecondaryInfoValueText}>1,00,000</Text>
        </View>
      </View>

      <VerticalSpace h={2} />

      <HorizontalLine />

      <VerticalSpace h={2} />

      <SolidButton
        label={`Buy Again`}
        customButtonStyle={{
          paddingVertical: hR *1.2,
        }}
        customLabelStyle={{ fontSize: sR }}
      />
    </TouchableOpacity>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderColor: PINBALL,
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    borderRadius: sR,
    width: wR * 92,
    marginBottom: hR * 2,
  },
  orderImageContainer: {
    padding: sR,
    backgroundColor: WHITE_SMOKE,
    borderRadius: sR,
  },
  orderImage: {
    height: sR * 3,
    width: sR * 3,
  },
  orderNoAndStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderNoText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.2,
  },
  orderStatusContainer: {
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 0.4,
    backgroundColor: THEME,
    borderRadius: 220,
  },
  orderStatusText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: WHITE,
    fontSize: sR,
  },
  orderDateTimeText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  orderPrimaryInfoContainer: { flexDirection: "row" },
  orderSecondaryInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderSecondaryInfoLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR,
    color: FLINT_STONE,
    opacity: 0.6,
  },
  orderSecondaryInfoValueText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  verticalLine: { height: "100%", width: 1, backgroundColor: PINBALL },
});

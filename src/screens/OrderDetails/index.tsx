import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { MessageQuestion } from "iconsax-react-native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import HorizontalLine from "../../components/HorizontalLine";
import CompaintModal from "../../components/Modals/ComplaintModal";

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

interface Product {
  name: string;
  qty: string;
  unitPrice: number;
}

const PRODUCT_LIST: Product[] = [
  {
    name: `Chakki Atta`,
    qty: `4`,
    unitPrice: 500,
  },
  {
    name: `Dalda Cooking Oil`,
    qty: `5`,
    unitPrice: 440,
  },
  {
    name: `Bio Amla Shampoo`,
    qty: `1`,
    unitPrice: 200,
  },
  {
    name: `Baisin`,
    qty: `4`,
    unitPrice: 200,
  },
  {
    name: `Sugar`,
    qty: `4`,
    unitPrice: 80,
  },
  {
    name: `Sugar`,
    qty: `4`,
    unitPrice: 80,
  },
  {
    name: `Sugar`,
    qty: `4`,
    unitPrice: 80,
  },
  {
    name: `Sugar`,
    qty: `4`,
    unitPrice: 80,
  },
];

const colors = [PRELUDE, ORCA_WHITE, EPHEMERAL_MIST, ALBESCENT_WHITE];

const OrderDetailsScreen: React.FC = () => {

  const[complaintModal,toggleComplaintModal] = useToggle(false)

  const itemTotal = PRODUCT_LIST.reduce(
    (acc, item) => acc + item.unitPrice * parseInt(item.qty, 10),
    0
  );
  const tax = itemTotal * 0.05;
  const markdown = 200;
  const aggregateTotal = itemTotal + tax - markdown;

  return (
    <View style={styles.rootContainer}>
      <CompaintModal isVisible={complaintModal} onClose={toggleComplaintModal} />

      <HeaderPrimary label="Order Details">
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
          <Text style={styles.orderNoText}>Order #s7ro-34-di98</Text>

          <Text style={styles.dateDeliveredText}>
            Delivered on 27 August, 20:10
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
                Ali Raza Foods Street 41, Islamabad
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

          {PRODUCT_LIST.map((item, index) => {
            const backgroundColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <View
                key={`${item.name}-${index}`} // Use a combination of name and index as a unique key
                style={{
                  ...styles.tableRowContainer,
                  backgroundColor: backgroundColor,
                }}
              >
                <View style={styles.tableCellContainer}>
                  <Text style={styles.tableValueText}>{item.name}</Text>
                </View>

                <View style={styles.tableCellContainer}>
                  <Text style={styles.tableValueText}>{item.qty}</Text>
                </View>

                <View style={styles.tableCellContainer}>
                  <Text style={styles.tableValueText}>{item.unitPrice}</Text>
                </View>

                <View style={styles.tableCellContainer}>
                  <Text style={styles.tableValueText}>
                    {(item.unitPrice * parseInt(item.qty, 10)).toString()}
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
              Goods & Services Tax 5% (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {tax.toFixed(2)}
            </Text>
          </View>

          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Markdown (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>{markdown}</Text>
          </View>

          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>Item Total</Text>
            <Text style={styles.orderSecondaryInfoValueText}>{itemTotal}</Text>
          </View>

          <View style={styles.orderSecondaryInfoContainer}>
            <Text style={styles.orderSecondaryInfoLabelText}>
              Aggregate Total (PKR)
            </Text>
            <Text style={styles.orderSecondaryInfoValueText}>
              {aggregateTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        <VerticalSpace h={2} />

        <HorizontalLine />

        <VerticalSpace h={2} />

        <View style={styles.feedbackContainer}>
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
        </View>

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

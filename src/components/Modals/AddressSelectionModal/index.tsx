import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Location, TickSquare } from "iconsax-react-native";
import { useDispatch } from "react-redux";

import ModalWrapper from "../ModalWrapper";
import VerticalSpace from "../../VerticalSpace";
import HorizontalSpace from "../../HorizontalSpace";
import HorizontalLine from "../../HorizontalLine";

import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import { BLACK, FLINT_STONE, THEME } from "../../../constants/colors";
import { hR, sR } from "../../../constants/dimensions";
import useDynamicSliceSelector from "../../../hooks/useDynamicSliceSelector";
import { setAddressFields } from "../../../redux/slices/address";

interface AddressSelectionModalProps {
  isVisible: boolean;
  onClose: () => void; 
}

const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { address } = useDynamicSliceSelector(["address"]);
  const [cardHeight, setCardHeight] = useState(0);
  const dispatch = useDispatch()

  const addressList = address?.addressList || [];
  const [updatedAddresses, setUpdatedAddresses] = useState(
    addressList.map((item, index) => ({
      ...item,
      isSelected: false,
    }))
  );

  const handleAddressSelection = (idToSelect: number, index:number) => {
    setUpdatedAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isSelected: item.id === idToSelect,
      }))
    );

    dispatch(setAddressFields({selectedAddress:address?.addressList[index]}))
    
    onClose()
  };

  const handleCardHeight = (height: number) => {
    if (height !== cardHeight) setCardHeight(height);
  };

  const maxHeight = cardHeight * (updatedAddresses.length > 3 ? 3 : 2);


  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      title="Select Delivery Address"
    >
      <Text style={styles.normalText}>
        Choose the right delivery address instantly for a hassle-free experience.
      </Text>

      <VerticalSpace h={2} />

      <View style={{ maxHeight }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {updatedAddresses.map(({ id, name, street, city, isSelected }, index) => (
            <View
              key={id}
              onLayout={({ nativeEvent }) =>
                handleCardHeight(nativeEvent.layout.height)
              }
            >
              <TouchableOpacity
                style={styles.addressButtonContainer}
                onPress={() => handleAddressSelection(id,index)}
              >
                <View style={styles.addressButtonLeftContainer}>
                  <Location size={sR * 2.6} color={THEME} variant="Bulk" />
                  <HorizontalSpace w={2} />
                  <View>
                    <Text style={styles.addressLabelText}>{name}</Text>
                    <Text style={styles.addressValueText}>
                      {street}, {city}
                    </Text>
                  </View>
                </View>
                <TickSquare
                  size={sR * 2}
                  color={THEME}
                  variant={isSelected ? "Bold" : "Linear"}
                />
              </TouchableOpacity>
              {index < updatedAddresses.length - 1 && <HorizontalLine />}
            </View>
          ))}
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default AddressSelectionModal;

const styles = StyleSheet.create({
  normalText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    opacity: 0.6,
    fontSize: sR * 1.2,
  },
  addressButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hR * 2,
  },
  addressButtonLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressLabelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.2,
    color: BLACK,
  },
  addressValueText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.4,
    color: BLACK,
  },
});

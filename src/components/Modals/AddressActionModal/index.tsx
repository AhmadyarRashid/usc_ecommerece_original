import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SolidButton from "../../Button/SolidButton";
import ModalWrapper from "../ModalWrapper";

import { BLACK, FLINT_STONE, RED_DOOR, WHITE } from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import VerticalSpace from "../../VerticalSpace";
import TextButton from "../../Button/TextButton";
import HorizontalSpace from "../../HorizontalSpace";

interface AddressActionModalProps {
  isVisible: boolean;
  onClose: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const AddressActionModal: React.FC<AddressActionModalProps> = ({
  isVisible,
  onClose,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      title={"Update/Delete Address"}
    >
      <Text style={styles.normalText}>
        Make necessary changes or delete outdated addresses instantly without
        hassle.
      </Text>

      <VerticalSpace h={2} />

      <View style={styles.buttonsContainer}>
        <TextButton label={"Update"} onPress={handleUpdate} />

        <HorizontalSpace w={4} />

        <TextButton
          label={"Delete Address"}
          customLabelStyle={{ color: RED_DOOR }}
          onPress={handleDelete}
        />
      </View>
    </ModalWrapper>
  );
};

export default AddressActionModal;

const styles = StyleSheet.create({
  normalText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    opacity: 0.6,
    fontSize: sR * 1.2,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

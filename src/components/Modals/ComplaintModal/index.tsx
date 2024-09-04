import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { CloseCircle } from "iconsax-react-native";

import InputField from "../../TextInput/InputField";
import VerticalSpace from "../../VerticalSpace";
import TextArea from "../../TextInput/TextArea";
import SolidButton from "../../Button/SolidButton";

import { BLACK, WHITE } from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../constants/fonts";

interface ComplaintModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmitForm: () => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isVisible,
  onClose,
  onSubmitForm,
}) => {
  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Service Experience Complaint</Text>

          <TouchableOpacity onPress={onClose}>
            <CloseCircle size={sR * 2} color={BLACK} />
          </TouchableOpacity>
        </View>

        <VerticalSpace h={2} />

        <InputField placeholder="Complaint Title" />

        <VerticalSpace h={2} />

        <TextArea placeholder="Complaint Message" />

        <VerticalSpace h={2} />

        <SolidButton label="Lodge Complaint" size="xl" onPress={onSubmitForm} />

        <VerticalSpace h={4} />
      </View>
    </Modal>
  );
};

export default ComplaintModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  rootContainer: {
    backgroundColor: WHITE,
    paddingHorizontal: wR * 4,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hR * 2,
  },
  headerText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
});

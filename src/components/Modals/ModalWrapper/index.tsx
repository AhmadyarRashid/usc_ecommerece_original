import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import { CloseCircle } from "iconsax-react-native";

import { BLACK, WHITE } from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../constants/fonts";

interface ModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={onClose}
    >
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{title}</Text>

          <TouchableOpacity onPress={onClose}>
            <CloseCircle size={sR * 2} color={BLACK} />
          </TouchableOpacity>
        </View>

        {children}
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  rootContainer: {
    backgroundColor: WHITE,
    paddingHorizontal: wR * 4,
    paddingBottom: hR * 4,
    paddingTop:hR*2
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

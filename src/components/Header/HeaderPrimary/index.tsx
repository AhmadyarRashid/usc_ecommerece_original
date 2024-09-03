import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from "react-native";
import { ArrowLeft2 } from "iconsax-react-native";

import HorizontalSpace from "../../HorizontalSpace";

import { hR, sR, wR } from "../../../constants/dimensions";
import { BLACK, WHITE } from "../../../constants/colors";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../constants/fonts";

interface HeaderPrimaryProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({ label, onPress }) => {
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity onPress={onPress}>
        <ArrowLeft2 size={sR * 2} color={BLACK} />
      </TouchableOpacity>

      <HorizontalSpace w={4} />

      <Text style={styles.headerLabelText}>{label}</Text>
    </View>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: hR * 2,
    paddingHorizontal: wR * 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  headerLabelText: {
    color: BLACK,
    fontSize: sR * 1.6,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
});

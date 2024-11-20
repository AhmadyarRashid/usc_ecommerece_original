import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import HorizontalSpace from "../../../../components/HorizontalSpace";

import { hR, sR } from "../../../../constants/dimensions";
import { BLACK, FLINT_STONE } from "../../../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../../../constants/fonts";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon,onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}

      <HorizontalSpace w={4} />

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:hR*2
  },
  label: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.3,
    color: FLINT_STONE,
  },
});

export default MenuItem;

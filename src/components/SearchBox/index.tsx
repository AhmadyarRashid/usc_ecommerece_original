import React, { useCallback, useEffect } from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";
import { SearchNormal1 } from "iconsax-react-native";
import { debounce } from "lodash";

import HorizontalSpace from "../HorizontalSpace";

import { hR, sR, wR } from "../../constants/dimensions";
import { BRILLIANCE, PINBALL, THEME } from "../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../constants/fonts";

interface SearchBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onChangeText }) => {
  const debouncedOnChange = useCallback(
    debounce((text: string) => {
      onChangeText(text);
    }, 1000),
    [onChangeText]
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <View style={styles.rootContainer}>
      <SearchNormal1 size={sR * 1.6} color={THEME} />

      <HorizontalSpace w={4} />

      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        onChangeText={debouncedOnChange}
        autoCapitalize={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1.6,
    paddingVertical: Platform.OS === "android" ? 0 : hR * 1.4,
    paddingHorizontal: wR * 4,
    borderColor: PINBALL,
    borderRadius: sR,
    backgroundColor: BRILLIANCE,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    width: wR * 72,
  },
});

export default SearchBox;

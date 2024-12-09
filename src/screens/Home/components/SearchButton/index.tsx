import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { SearchNormal1 } from "iconsax-react-native";

import HorizontalSpace from "../../../../components/HorizontalSpace";

import { hR, sR, wR } from "../../../../constants/dimensions";
import { BRILLIANCE, PINBALL, THEME } from "../../../../constants/colors";
import { PROXIMA_NOVA_REGULAR } from "../../../../constants/fonts";

interface SearchButtonProps {
  onSearchButtonPress: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearchButtonPress }) => {
  return (
    <Pressable style={styles.rootContainer} onPress={onSearchButtonPress}>
      <SearchNormal1 size={sR * 1.6} color={THEME} />

      <HorizontalSpace w={4} />

      <Text style={styles.buttonText}>Search anything you want...</Text>
    </Pressable>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  rootContainer: {
    width: wR * 92,
    borderWidth: 1.6,
    paddingVertical: Platform.OS === "android" ? 0 : hR * 1.4,
    paddingHorizontal: wR * 4,
    borderColor: PINBALL,
    borderRadius: sR,
    backgroundColor: BRILLIANCE,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
  },
});

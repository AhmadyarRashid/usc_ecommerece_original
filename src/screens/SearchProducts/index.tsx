import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import SearchBox from "../../components/SearchBox";
import LottieAnimation from "../../components/LottieAnimation";
import ProductsSecondaryCard from "../../components/Cards/ProductsSecondaryCard";

import { BLACK, WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { sR, wR } from "../../constants/dimensions";
import { SEARCH_PRODUCTS } from "../../constants/animations";
import { PROXIMA_NOVA_REGULAR } from "../../constants/fonts";

const SearchProductsScreen: React.FC = ({}) => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <HeaderPrimary label={`Search Products`} onPress={goBack} />

      <View style={styles.secondaryContainer}>
        <VerticalSpace h={2} />

        <SearchBox placeholder="Search anything you want..." />

        <VerticalSpace h={2} />

        {/* <View
          style={{
            alignItems: "center",
          }}
        >
          <LottieAnimation
            source={SEARCH_PRODUCTS}
            customStyle={styles.searchProductAnimation}
            loop={true}
          />

          <Text style={styles.quicklySearchProductsText}>
            Quickly search for products in your inventory with ease. Enter
            keywords or filters to locate the items you need in no time.
          </Text>
        </View> */}

        <ProductsSecondaryCard />
      </View>
    </View>
  );
};

export default SearchProductsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  secondaryContainer: {
    paddingHorizontal: wR * 4,
  },
  searchProductAnimation: {
    height: sR * 18,
    width: sR * 18,
  },
  quicklySearchProductsText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    textAlign: "center",
    fontSize: sR * 1.3,
    color: BLACK,
    opacity: 0.6,
  },
});

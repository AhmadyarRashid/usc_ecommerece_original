import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import ComplaintCard from "../../components/Cards/ComplaintCard";
import VerticalSpace from "../../components/VerticalSpace";

import { WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";

const MyComplaintsScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
      }}
    >
      <HeaderPrimary label={`My Complaints`} onPress={goBack} />

      <VerticalSpace h={2} />

      <FlatList
        data={[...Array(8)]}
        renderItem={({ item }) => <ComplaintCard />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyComplaintsScreen;

import { FlatList, StyleSheet, View } from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AxiosRequestHeaders } from "axios";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import ComplaintCard from "../../components/Cards/ComplaintCard";
import VerticalSpace from "../../components/VerticalSpace";
import Loader from "../../components/Loader";
import NoContentDisplay from "../../components/NoContentDisplay";

import { WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import useApiHook from "../../hooks/rest/useApi";
import { setComplaintFields } from "../../redux/slices/complaint";

const MyComplaintsScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const { complaint, auth } = useDynamicSliceSelector(["complaint", "auth"]);
  const { handleRestApi, restApiLoading } = useApiHook();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const complaints = complaint?.complaintList;

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
    };

    const response = await handleRestApi({
      method: "post",
      url: "customer_complaint_view",
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response.data.result.status === 200) {
      dispatch(
        setComplaintFields({ complaintList: response?.data?.result?.review })
      );
    }
  };

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
      {restApiLoading && <Loader />}

      <HeaderPrimary
        label={t(`MY_COMPLAINTS.MY_COMPLAINTS`)}
        onPress={goBack}
      />

      {isEmpty(complaints) ? (
        <View style={styles.emptyListContainer}>
          <NoContentDisplay
            label={t(`MY_COMPLAINTS.NO_COMPLAINT_AVAILABLE`)}
            info={t(`MY_COMPLAINTS.NO_COMPLAINT_MESSAGE`)}
            displayActionButton={true}
            actionButtonText={t(`MY_COMPLAINTS.REGISTER_COMPLAINT_BUTTON`)}
            onActionButtonPress={goBack}
          />
        </View>
      ) : (
        <>
          <VerticalSpace h={2} />

          <FlatList
            data={complaints}
            renderItem={({ item }) => <ComplaintCard data={item} />}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default MyComplaintsScreen;

const styles = StyleSheet.create({
  emptyListContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

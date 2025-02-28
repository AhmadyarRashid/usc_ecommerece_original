import React, { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Field, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { isUndefined } from "lodash";
import { useTranslation } from "react-i18next";

import HeaderPrimary from "../../components/Header/HeaderPrimary";
import VerticalSpace from "../../components/VerticalSpace";
import InputField from "../../components/TextInput/InputField";
import SolidButton from "../../components/Button/SolidButton";
import Loader from "../../components/Loader";

import { BLACK, FLINT_STONE, WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import { sR, wR } from "../../constants/dimensions";
import {
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../constants/fonts";
import { createAddressSchema } from "../../constants/schemas";
import { RootState } from "../../redux/store";
import useApiHook from "../../hooks/rest/useApi";
import { displayToast } from "../../constants/functions";
import { setAddressFields } from "../../redux/slices/address";

interface AddressValues {
  name: string;
  street: string;
  city: string;
  additionalNotes: string;
}

const ConfirmAddressScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute();
  const formikRef = useRef<FormikProps<AddressValues>>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const { handleRestApi, restApiLoading } = useApiHook();
  const dispatch = useDispatch();
  const { addressData } = route?.params || {};
  const { t } = useTranslation();

  const INITIAL_VALUES: AddressValues = isUndefined(addressData?.id)
    ? {
        name: "",
        street: "",
        city: "",
        additionalNotes: "",
      }
    : {
        name: addressData?.name || "",
        street: addressData?.street || "",
        city: addressData?.city || "",
        additionalNotes: addressData?.notes || "",
      };

  const saveAddress = async (values: AddressValues, isUpdate: boolean) => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      name: values.name,
      street: values.street,
      city: values.city,
      phone: "",
      mobile: auth.userName,
      notes: values.additionalNotes,
      latitude: addressData?.latitude?.toString() || "",
      longitude: addressData?.longitude?.toString() || "",
      ...(isUpdate && { id: addressData?.id }),
    };

    const endpoint = isUpdate ? "user_address_upd" : "user_address_create";

    const response = await handleRestApi({
      method: "post",
      url: endpoint,
      data,
    });

    if (isResponseSuccess(response)) {
      await fetchAndDispatchAddresses();
    }
  };

  const fetchAndDispatchAddresses = async () => {
    const response = await handleRestApi({
      method: "post",
      url: "user_address_view_all",
      data: { auth_token: auth.accessToken, login: auth.userName },
    });

    if (isResponseSuccess(response)) {
      const addressList = response?.data?.result?.address || [];
      dispatch(setAddressFields({ addressList }));
      goToAppBottomTab();
    }
  };

  const isResponseSuccess = (response: any): boolean => {
    return response?.data?.result?.status === 200;
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToAppBottomTab = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "AppBottomTab" }],
    });
  }, [navigation]);

  const renderInputField = (name: keyof AddressValues, placeholder: string) => (
    <Field name={name}>
      {({ field, meta }: any) => (
        <>
          <InputField
            placeholder={placeholder}
            onChangeText={field.onChange(name)}
            onBlur={field.onBlur(name)}
            value={field.value}
          />
          {meta.touched && meta.error && (
            <>
              <VerticalSpace h={1} />
              <Text style={styles.errorText}>{meta.error}</Text>
            </>
          )}
        </>
      )}
    </Field>
  );

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label={t(`CONFIRM_ADDRESS.CONFIRM_ADDRESS`)} onPress={goBack} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        <Text style={styles.normalText}>
        {t(`CONFIRM_ADDRESS.MESSAGE`)}
        </Text>

        <VerticalSpace h={2} />

        <Formik
          innerRef={formikRef}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) =>
            saveAddress(values, !isUndefined(addressData?.id))
          }
          initialValues={INITIAL_VALUES}
          validationSchema={createAddressSchema}
        >
          {({ handleSubmit }) => (
            <>
              <Text style={styles.labelText}>{t(`CONFIRM_ADDRESS.NAME`)}*</Text>
              <VerticalSpace h={2} />
              {renderInputField("name",t(`CONFIRM_ADDRESS.NAME`))}

              <VerticalSpace h={2} />
              <Text style={styles.labelText}>
              {t(`CONFIRM_ADDRESS.HOUSE_STREET`)}*
              </Text>
              <VerticalSpace h={2} />
              {renderInputField(
                "street",
                t(`CONFIRM_ADDRESS.ENTER_HOUSE_STREET`)
              )}

              <VerticalSpace h={2} />
              <Text style={styles.labelText}>{t(`CONFIRM_ADDRESS.CITY`)}*</Text>
              <VerticalSpace h={2} />
              {renderInputField("city", t(`CONFIRM_ADDRESS.ENTER_CITY`))}

              <VerticalSpace h={2} />
              <Text style={styles.labelText}>
                {t(`CONFIRM_ADDRESS.ADDITIONAL_NOTES`)}
              </Text>
              <VerticalSpace h={2} />
              {renderInputField(
                "additionalNotes",
                t(`CONFIRM_ADDRESS.NOTE_TO_RIDER`)
              )}

              <VerticalSpace h={2} />
              <SolidButton
                label={t(`CONFIRM_ADDRESS.SAVE_CONTINUE`)}
                size="xl"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ConfirmAddressScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: WHITE },
  scrollViewContainer: { paddingHorizontal: wR * 4 },
  labelText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    color: BLACK,
    fontSize: sR * 1.4,
  },
  normalText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    color: FLINT_STONE,
    opacity: 0.6,
    fontSize: sR * 1.2,
  },
  errorText: {
    color: "red",
    fontSize: sR * 1.2,
  },
});

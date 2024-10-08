import { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Field, Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";

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

interface CreateAddressValues {
  name: string;
  street: string;
  city: string;
  additionalNotes: string;
}

const ConfirmAddressScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const formikRef = useRef<FormikProps<CreateAddressValues>>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const { handleRestApi, restApiLoading } = useApiHook();

  const createAddress = async (values: CreateAddressValues) => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      latitude: "",
      longitude: "",
      name: values.name,
      street: values.street,
      city: values.city,
      phone: "",
      mobile: auth.userName,
      notes: values.additionalNotes,
    };

    const response = await handleRestApi({
      method: "post",
      url: "user_address_create",
      data,
    });

    if (response?.data?.result?.status === 200) {
      goToHome();
    } else {
      displayToast({
        type: "error",
        text1: "Error",
        text2: response?.data?.result?.error || "Failed to fetch addresses",
      });
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const renderInputField = (
    name: keyof CreateAddressValues,
    placeholder: string
  ) => (
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
              <Text style={{ color: "red" }}>{meta.error}</Text>
            </>
          )}
        </>
      )}
    </Field>
  );

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label="Confirm Address" onPress={goBack} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <VerticalSpace h={2} />

        <Text style={styles.normalText}>
          By adding your address, we will make sure your orders are delivered
          correctly and on time. This also speeds up the checkout process for
          future purchases, ensuring smooth transactions and accurate shipping
          options.
        </Text>

        <VerticalSpace h={2} />

        <Formik
          innerRef={formikRef}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={createAddress}
          initialValues={{
            name: "",
            street: "",
            city: "",
            additionalNotes: "",
          }}
          validationSchema={createAddressSchema}
        >
          {({ handleSubmit }) => (
            <>
              <Text style={styles.labelText}>Name*</Text>
              <VerticalSpace h={2} />
              {renderInputField("name", "Name")}
              <VerticalSpace h={2} />

              <Text style={styles.labelText}>
                House/building/flat & street #*
              </Text>
              <VerticalSpace h={2} />
              {renderInputField(
                "street",
                "Enter house/building/flat & street #"
              )}
              <VerticalSpace h={2} />

              <Text style={styles.labelText}>City*</Text>
              <VerticalSpace h={2} />
              {renderInputField("city", "Enter city")}
              <VerticalSpace h={2} />

              <Text style={styles.labelText}>
                Additional Delivery Notes/Alternate Contact Information etc.
              </Text>
              <VerticalSpace h={2} />
              <Text style={styles.normalText}>
                Include further details about your address
              </Text>
              <VerticalSpace h={2} />
              {renderInputField(
                "additionalNotes",
                "Note to rider - e.g landmark"
              )}
              <VerticalSpace h={2} />

              <SolidButton
                label="Save & Continue"
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
});

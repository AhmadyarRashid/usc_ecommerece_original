import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useRef } from "react";

import HeaderPrimary from "../../components/Header/HeaderPrimary";

import { WHITE } from "../../constants/colors";
import { AppNavigationProps } from "../../constants/navigationTypes";
import VerticalSpace from "../../components/VerticalSpace";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import { complaintOrderSchema } from "../../constants/schemas";
import InputField from "../../components/TextInput/InputField";
import TextArea from "../../components/TextInput/TextArea";
import SolidButton from "../../components/Button/SolidButton";
import { sR, wR } from "../../constants/dimensions";
import useDynamicSliceSelector from "../../hooks/useDynamicSliceSelector";
import useApiHook from "../../hooks/rest/useApi";
import { AxiosRequestHeaders } from "axios";
import { displayToast } from "../../constants/functions";
import Loader from "../../components/Loader";

interface RegisterComplaintValues {
  title: string;
  message: string;
}

const RegisterComplaintScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const formikRef = useRef<FormikProps<RegisterComplaintValues>>(null);
  const { auth } = useDynamicSliceSelector(["auth"]);
  const { handleRestApi, restApiLoading } = useApiHook();

  const handleRegisterComplaint = async (
    values: RegisterComplaintValues
  ): Promise<void> => {
    const data = {
      auth_token: auth?.accessToken,
      login: auth?.userName,
      complaint_text: values.message,
    };

    const response = await handleRestApi({
      method: "post",
      url: "customer_complaint_create",
      data,
      headers: { Authorization: "none" } as AxiosRequestHeaders,
    });

    if (response?.data?.result?.status === 200) {
      formikRef.current?.resetForm();

      displayToast({
        type: "success",
        text1: "Success",
        text2: "Your complaint has been registered successfully!",
      });

      goBack();
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label="Register Complaint" onPress={goBack} />

      <VerticalSpace h={2} />

      <View
        style={{
          paddingHorizontal: wR * 4,
        }}
      >
        <Formik
          innerRef={formikRef}
          validateOnChange
          validateOnBlur
          onSubmit={handleRegisterComplaint}
          initialValues={{
            title: "",
            message: "",
          }}
          validationSchema={complaintOrderSchema}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field name="title">
                {({ field, meta }: FieldProps) => (
                  <>
                    <InputField
                      placeholder="Complaint Title"
                      onChangeText={field.onChange("title")}
                      onBlur={field.onBlur("title")}
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

              <VerticalSpace h={2} />

              {/* Message Field */}
              <Field name="message">
                {({ field, meta }: FieldProps) => (
                  <>
                    <TextArea
                      placeholder="Complaint Message"
                      onChangeText={field.onChange("message")}
                      onBlur={field.onBlur("message")}
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

              <VerticalSpace h={2} />

              {/* Submit Button */}
              <SolidButton
                label={restApiLoading ? "Submitting..." : "Lodge Complaint"}
                size="xl"
                onPress={handleSubmit}
                disabled={!isValid || restApiLoading}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default RegisterComplaintScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  errorText: {
    color: `red`,
    fontSize: sR * 1.1,
  },
});

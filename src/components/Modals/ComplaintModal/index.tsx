import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { CloseCircle } from "iconsax-react-native";
import { Field, Formik, FormikProps, FieldProps } from "formik";
import { AxiosRequestHeaders } from "axios";

import InputField from "../../TextInput/InputField";
import VerticalSpace from "../../VerticalSpace";
import TextArea from "../../TextInput/TextArea";
import SolidButton from "../../Button/SolidButton";

import { BLACK, WHITE } from "../../../constants/colors";
import { hR, sR, wR } from "../../../constants/dimensions";
import { PROXIMA_NOVA_SEMIBOLD } from "../../../constants/fonts";
import { complaintOrderSchema } from "../../../constants/schemas";
import useDynamicSliceSelector from "../../../hooks/useDynamicSliceSelector";
import useApiHook from "../../../hooks/rest/useApi";
import { displayToast } from "../../../constants/functions";

interface ComplaintModalProps {
  isVisible: boolean;
  onClose: () => void;
  orderID: number;
}

interface RegisterComplaintValues {
  title: string;
  message: string;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isVisible,
  onClose,
  orderID,
}) => {
  const formikRef = useRef<FormikProps<RegisterComplaintValues>>(null);
  const { auth } = useDynamicSliceSelector(["auth"]);
  const { handleRestApi, restApiLoading } = useApiHook();

  const handleRegisterComplaint = async (
    values: RegisterComplaintValues
  ): Promise<void> => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
      orderID,
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

      onClose();
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.rootContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Service Experience Complaint</Text>

          <TouchableOpacity onPress={onClose}>
            <CloseCircle size={sR * 2} color={BLACK} />
          </TouchableOpacity>
        </View>

        <VerticalSpace h={2} />

        {/* Form */}
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
              {/* Title Field */}
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

        <VerticalSpace h={4} />
      </View>
    </Modal>
  );
};

export default ComplaintModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  rootContainer: {
    backgroundColor: WHITE,
    paddingHorizontal: wR * 4,
    paddingBottom: hR * 2,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hR * 2,
  },
  headerText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.4,
    color: BLACK,
  },
  errorText: {
    color: `red`,
    fontSize: sR * 1.1,
  },
  loader: {
    marginTop: hR * 2,
  },
});

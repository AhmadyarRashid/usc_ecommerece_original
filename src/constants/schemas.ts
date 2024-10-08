import * as Yup from "yup";

export const createAddressSchema = Yup.object().shape({
  name: Yup.string().trim().required(`Name is required`),
  street: Yup.string().trim().required(`Street is required`),
  city: Yup.string().trim().required(`City is required`),
  additionalNotes: Yup.string().trim().required(`Note is required`),
});

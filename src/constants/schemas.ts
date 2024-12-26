import * as Yup from "yup";

export const createAddressSchema = Yup.object().shape({
  name: Yup.string().trim().required(`Name is required`),
  street: Yup.string().trim().required(`Street is required`),
  city: Yup.string().trim().required(`City is required`),
  additionalNotes: Yup.string().trim().required(`Note is required`),
});

export const complaintOrderSchema = Yup.object().shape({
  title: Yup.string().trim().required(`Title is required`).min(40, `Title must be at least 40 characters`),
  message: Yup.string()
    .trim()
    .required(`Message is required`)
    .min(120, `Message must be at least 100 characters`),
});

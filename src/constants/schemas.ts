import * as Yup from "yup";

export const createAddressSchema = Yup.object().shape({
  unitNo: Yup.string().trim().required(`House/building/flat # is required`),
  street: Yup.string().trim().required(`Street is required`),
  city: Yup.string().trim().required(`City is required`),
  additionalNotes: Yup.string().trim().required(`Note is required`),
});

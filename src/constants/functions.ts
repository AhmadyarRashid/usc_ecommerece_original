import Toast from "react-native-toast-message";

interface ToastParams {
  type: string;
  text1: string;
  text2: string;
}

export const displayToast = ({ type, text1, text2 }: ToastParams): void => {
  Toast.show({
    type,
    text1,
    text2,
    position: "bottom",
  });
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^03\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateOTP = (otp: string) => {
  const otpPattern = /^\d{6}$/;
  return otpPattern.test(otp);
};

export const scheduledNavigation = (callback: () => void) => {
  setTimeout(() => {
    callback();
  }, 2000);
};

export const countCartItem = (cartList: string[] | undefined): number => {
  if (!cartList) return 0;
  return cartList.length;
};

export const calculateOrderCost = (
  cartList: string[] | undefined
): {
  subtotal: number;
  standardDelivery: number;
  platformFees: number;
  vat: number;
  grandTotal: number;
} => {
  if (!cartList || cartList.length === 0) {
    return {
      subtotal: 0,
      standardDelivery: 0,
      platformFees: 0,
      vat: 0,
      grandTotal: 0,
    };
  }

  const subtotal = cartList.reduce((total, item) => {
    return total + item.list_price * item.count;
  }, 0);

  const standardDelivery = 150;
  const platformFees = 12;
  const vat = 250;
  const grandTotal = subtotal + standardDelivery + platformFees + vat;

  return {
    subtotal,
    standardDelivery,
    platformFees,
    vat,
    grandTotal,
  };
};

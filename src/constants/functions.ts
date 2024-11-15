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
  if (!cartList) return 0
  return cartList.length;
};

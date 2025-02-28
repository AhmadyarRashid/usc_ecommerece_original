import { wR } from "./dimensions";

interface ButtonSize {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const ButtonSize: ButtonSize = {
  sm: wR * 26,
  md: wR * 48,
  lg: wR * 62,
  xl: wR * 92,
};

export const LANGUAGE = {
  ur: {
    greeting: "السلام علیکم 👋",
    inquiry: "کیا آپ ٹھیک ہیں؟",
    languageText: "اردو",
  },
  en: {
    greeting: "Hi 👋",
    inquiry: "Are you ok?",
    languageText: "English",
  },
};
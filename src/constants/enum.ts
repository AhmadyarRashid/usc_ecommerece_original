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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

/**
 * Custom hook for dynamically selecting multiple slices from the Redux state.
 * @param sliceKeys - An array of slice keys from RootState to select.
 * @returns An object containing the selected slices keyed by the provided slice names.
 */
const useDynamicSliceSelector = (sliceKeys: (keyof RootState)[]) => {
    return useSelector((state: RootState) => {
      return sliceKeys.reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {} as Partial<RootState>);
    });
  };
  
  export default useDynamicSliceSelector;
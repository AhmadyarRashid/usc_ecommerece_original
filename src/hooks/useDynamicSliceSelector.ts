import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../redux/store";

/**
 * Custom hook for dynamically selecting multiple slices from the Redux state,
 * optimized to avoid unnecessary re-renders.
 * @param sliceKeys - An array of slice keys from RootState to select.
 * @returns An object containing the selected slices keyed by the provided slice names.
 */
const useDynamicSliceSelector = (sliceKeys: (keyof RootState)[]) => {
  // Create a memoized selector for the dynamic slices
  const selectSlices = createSelector(
    [(state: RootState) => state],
    (state) =>
      sliceKeys.reduce((acc, key) => {
        acc[key] = state[key] || {};
        return acc;
      }, {} as Partial<RootState>)
  );

  return useSelector(selectSlices);
};

export default useDynamicSliceSelector;

import { createSelector } from 'reselect';
import { RootState } from './store';

export const createDynamicSelector = <K extends keyof RootState>(sliceNames: K[]) =>
  createSelector(
    sliceNames.map(slice => (state: RootState) => state[slice]),
    (...slices) =>
      slices.reduce((result, slice, index) => {
        result[sliceNames[index]] = slice;
        return result;
      }, {} as Partial<RootState>)
  );

import React from 'react';
import { View } from 'react-native';

import { hR } from '../../constants/dimensions';

interface VerticalSpaceProps {
  h: number;
}

const VerticalSpace: React.FC<VerticalSpaceProps> = ({ h }) => {
  return <View style={{ height: hR * h }} />;
};

export default VerticalSpace;

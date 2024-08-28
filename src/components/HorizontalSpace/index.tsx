import React from 'react';
import {View} from 'react-native';

import {wR} from '../../constants/dimensions';

interface HorizontalSpaceProps {
  w: number;
}

const HorizontalSpace: React.FC<HorizontalSpaceProps> = ({w}) => {
  return <View style={{width: wR * w}} />;
};

export default HorizontalSpace;

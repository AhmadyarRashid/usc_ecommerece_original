import React from 'react';
import {View} from 'react-native';

import {wR} from '../../constants/dimensions';
import {PINBALL} from '../../constants/colors';

const HorizontalLine: React.FC = () => {
  return (
    <View
      style={{
        borderWidth: 0.6,
        // width: wR * 92,
        borderColor: PINBALL,
      }}
    />
  );
};

export default HorizontalLine;

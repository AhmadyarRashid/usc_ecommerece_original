import React from 'react';
import LottieView from 'lottie-react-native';
import {ViewStyle} from 'react-native';

interface LottieAnimationProps {
  source: any;
  customStyle?: ViewStyle;
  loop?:boolean
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  customStyle,
  loop=true
}) => {
  return <LottieView source={source} autoPlay loop={loop} style={customStyle} />;
};

export default LottieAnimation;

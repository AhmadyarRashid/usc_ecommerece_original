import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Star1 } from 'iconsax-react-native';

import HorizontalSpace from '../HorizontalSpace';

import { sR } from '../../constants/dimensions';
import { FLINT_STONE, GREY, JASPER_CANE, THEME, WHITE_SMOKE } from '../../constants/colors';

type RatingProps = {
  onRatingSelected: (rating: number) => void;
};

const Rating: React.FC<RatingProps> = ({ onRatingSelected }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingPress = (rating: number) => {
    setSelectedRating(rating);
    onRatingSelected?.(rating);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <TouchableOpacity
          key={rating}
          onPress={() => handleRatingPress(rating)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: sR,
            borderWidth: 1,
            padding: sR * 0.4,
            borderColor: selectedRating >= rating ? THEME : GREY,
            backgroundColor: WHITE_SMOKE,
            marginHorizontal: sR * 0.2,
          }}>
          <Star1
            size={sR}
            color={selectedRating >= rating ? THEME : FLINT_STONE}
            variant={selectedRating >= rating ? 'Bold' : 'Linear'}
          />
          <HorizontalSpace w={1} />
          <Text style={{ color: FLINT_STONE, fontSize: sR }}>{rating}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;
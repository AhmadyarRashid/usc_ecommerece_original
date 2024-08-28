import React from 'react';
import {StyleSheet, TextInput, View, TextInputProps} from 'react-native';
import {SearchNormal1} from 'iconsax-react-native';

import HorizontalSpace from '../HorizontalSpace';

import {hR, sR, wR} from '../../constants/dimensions';
import {BRILLIANCE, PINBALL, THEME} from '../../constants/colors';
import {PROXIMA_NOVA_REGULAR} from '../../constants/fonts';

interface SearchBoxProps {
  placeholder: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({placeholder}) => {
  return (
    <View style={styles.rootContainer}>
      <SearchNormal1 size={sR * 1.6} color={THEME} />

      <HorizontalSpace w={4} />
      
      <TextInput placeholder={placeholder} style={styles.searchInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1.6,
    paddingVertical: hR * 1.4,
    paddingHorizontal: wR * 4,
    borderColor: PINBALL,
    borderRadius: 220,
    backgroundColor: BRILLIANCE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    width: wR * 66,
  },
});

export default SearchBox;

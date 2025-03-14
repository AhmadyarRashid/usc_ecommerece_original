import React, {useCallback, useEffect} from 'react';
import {StyleSheet, TextInput, View, Platform} from 'react-native';
import {SearchNormal1} from 'iconsax-react-native';
import {debounce} from 'lodash';

import HorizontalSpace from '../HorizontalSpace';

import {hR, sR, wR} from '../../constants/dimensions';
import {BLACK, LUCKY_GREY, WHITE} from '../../constants/colors';
import {PROXIMA_NOVA_REGULAR} from '../../constants/fonts';

interface SearchBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({placeholder, onChangeText}) => {
  const debouncedOnChange = useCallback(
    debounce((text: string) => {
      onChangeText(text);
    }, 1000),
    [onChangeText],
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <View style={styles.rootContainer}>
      <SearchNormal1 size={sR * 1.6} color={LUCKY_GREY} />

      <HorizontalSpace w={4} />

      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        onChangeText={debouncedOnChange}
        autoCapitalize={false}
        placeholderTextColor={LUCKY_GREY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: Platform.OS === 'android' ? 0 : hR * 1.4,
    paddingHorizontal: wR * 4,
    borderRadius: sR,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  searchInput: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    width: wR * 72,
    color: BLACK,
  },
});

export default SearchBox;

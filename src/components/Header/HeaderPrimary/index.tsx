import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import {ArrowLeft2} from 'iconsax-react-native';

import HorizontalSpace from '../../HorizontalSpace';

import {hR, sR, wR} from '../../../constants/dimensions';
import {THEME, WHITE} from '../../../constants/colors';
import {PROXIMA_NOVA_SEMIBOLD} from '../../../constants/fonts';

interface HeaderPrimaryProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  displayBackButton?: boolean;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({
  label,
  onPress,
  displayBackButton = true,
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.leftContainer}>
        {displayBackButton && (
          <>
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.backButton}>
              <ArrowLeft2 size={sR * 1.6} color={WHITE} />
            </TouchableOpacity>

            <HorizontalSpace w={2} />
          </>
        )}

        <Text style={styles.headerLabelText}>{label}</Text>
      </View>
    </View>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: hR * 1.4,
    paddingHorizontal: wR * 4,
    backgroundColor: THEME,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: sR * 0.5,
  },
  headerLabelText: {
    color: WHITE,
    fontSize: sR * 1.5,
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
});

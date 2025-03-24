import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import HorizontalSpace from '../../../../components/HorizontalSpace';

import { hR, sR } from '../../../../constants/dimensions';
import { BLACK, STORMY_GREY } from '../../../../constants/colors';
import { PROXIMA_NOVA_REGULAR } from '../../../../constants/fonts';
import { ArrowRight2 } from 'iconsax-react-native';

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onMenuItemPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, onMenuItemPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onMenuItemPress} activeOpacity={0.7}>
      <View style={styles.leftContianer}>
        {icon}

        <HorizontalSpace w={4} />
        
        <Text style={styles.label}>{label}</Text>
      </View>

      <ArrowRight2 size={sR * 1.8} color={STORMY_GREY} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hR * 2,
  },
  leftContianer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.3,
    color: STORMY_GREY,
  },
});

export default MenuItem;

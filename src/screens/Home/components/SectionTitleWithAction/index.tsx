import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PROXIMA_NOVA_REGULAR, PROXIMA_NOVA_SEMIBOLD } from '../../../../constants/fonts';
import { sR } from '../../../../constants/dimensions';
import { BLACK, FLINT_STONE } from '../../../../constants/colors';

interface SectionTitleWithActionProps {
  title: string;
  onViewAllPress?: () => void
}

const SectionTitleWithAction: React.FC<SectionTitleWithActionProps> = ({ title, onViewAllPress }) => {
    const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
       
      <TouchableOpacity onPress={onViewAllPress}>
        <Text style={styles.actionButtonText}>{t(`HOME.VIEW_ALL`)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  title: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.6,
    color: BLACK,
  } as TextStyle,
  actionButtonText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR * 1.2,
    color: FLINT_STONE,
    opacity: 0.6,
  } as TextStyle,
});

export default SectionTitleWithAction;

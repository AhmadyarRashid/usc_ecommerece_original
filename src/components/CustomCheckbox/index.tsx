import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import HorizontalSpace from '../HorizontalSpace';
import {BLACK, COMMUNIST, THEME, WHITE} from '../../constants/colors';
import {hR, sR} from '../../constants/dimensions';
import { PROXIMA_NOVA_REGULAR } from '../../constants/fonts';

interface CheckboxItem {
  label: string;
  value: string;
}

interface CustomCheckboxProps {
  items: CheckboxItem[];
  onSelect: (selectedValue: string) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({items, onSelect}) => {
  const [selected, setSelected] = useState<string>(items[0]?.value || '');

  const handlePress = (value: string) => {
    setSelected(value);
    onSelect(value);
  };
  
  return (
    <View>
      {items.map(({label, value}) => (
        <TouchableOpacity
          key={value}
          style={styles.container}
          onPress={() => handlePress(value)}>
          <View style={styles.checkbox}>
            {selected === value && <Text style={{color:COMMUNIST}}>✓</Text>}
          </View>

          <HorizontalSpace w={4} />

          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hR,
  },
  checkbox: {
    height: sR * 2,
    width: sR * 2,
    borderWidth: 1,
    borderRadius: sR * 0.6,
    borderColor: THEME,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: sR * 1.2,
    color: BLACK,
    fontFamily:PROXIMA_NOVA_REGULAR
  },
});

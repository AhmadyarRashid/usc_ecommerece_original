import {ScrollView, View} from 'react-native';

import HeaderPrimary from '../../components/Header/HeaderPrimary';

import {WHITE} from '../../constants/colors';

const ShoppingCartScreen = () => {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        flex: 1,
      }}>
      <HeaderPrimary label="Shopping Bag" />

      <ScrollView></ScrollView>
    </View>
  );
};

export default ShoppingCartScreen;
